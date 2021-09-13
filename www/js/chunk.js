import {Vector} from "./helpers.js";
import {BLOCK, CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z} from "./blocks.js";
import GeometryTerrain from "./geometry_terrain.js";

// Creates a new chunk
export default class Chunk {

    // #chunkManager = null;
    // #vertices     = null;

    constructor(chunkManager, pos, modify_list) {

        // info
        this.key = chunkManager.getPosChunkKey(pos);
        this.modify_list = modify_list;

        // размеры чанка
        this.size = new Vector(
            CHUNK_SIZE_X,
            CHUNK_SIZE_Y,
            CHUNK_SIZE_Z
        );

        // относительные координаты чанка
        this.addr = new Vector(
            pos.x,
            pos.y,
            pos.z
        );
        this.coord = new Vector(
            this.addr.x * CHUNK_SIZE_X,
            this.addr.y * CHUNK_SIZE_Y,
            this.addr.z * CHUNK_SIZE_Z
        );

        this.seed = chunkManager.world.seed;
        this.blocks = null;

        this.id = [
            this.addr.x,
            this.addr.y,
            this.addr.z,
            this.size.x,
            this.size.y,
            this.size.z
        ].join('_');

        // Run webworker method
        chunkManager.postWorkerMessage(['createChunk', Object.assign(this, {shift: Object.assign({}, Game.shift)})]);

        // Objects & variables
        this.chunkManager               = chunkManager;
        this.inited                     = false;
        this.dirty                      = true;
        this.buildVerticesInProgress    = false;
        this.vertices_length            = 0;
        this.vertices                   = {};
        this.fluid_blocks               = [];
        this.gravity_blocks             = [];

        this.chunkManager.addToDirty(this);

    }

    // onBlocksGenerated ... Webworker callback method
    onBlocksGenerated(args) {
        this.blocks = args.blocks;
        this.inited = true;
    }

    // doShift
    doShift(shift) {
        if(this.dirty) {
            return 0;
        }
        if((shift.x - this.shift.x == 0) && (shift.z - this.shift.z == 0)) {
            return 0;
        }
        const x = shift.x - this.shift_orig.x;
        const z = shift.z - this.shift_orig.z;
        this.shift_orig = {...shift};
        let points = 0;
        for(let key of Object.keys(this.vertices)) {
            let v = this.vertices[key];
            let list = v.buffer.vertices;
            for(let i = 0; i < list.length; i += GeometryTerrain.strideFloats) {
                list[i + 0] -= x;
                list[i + 1] -= z;
                points += 2;
            }
            v.buffer.updateInternal(list);
        }
        return points;
    }

    // onVerticesGenerated ... Webworker callback method
    onVerticesGenerated(args) {
        this.vertices_args = args;
        if(!this.map) {
            this.map = args.map;
        }
    }

    drawBufferGroup(render, group, mat) {
        if(this.vertices[group]) {
            if(this.vertices[group].buffer) {
                render.drawMesh(this.vertices[group].buffer, mat);
                return true;
            }
        }
        return false;
    }

    // Apply vertices
    applyVertices() {
        const args = this.vertices_args;
        delete(this['vertices_args']);
        this.chunkManager.deleteFromDirty(this.key);
        this.buildVerticesInProgress            = false;
        this.chunkManager.vertices_length_total -= this.vertices_length;
        this.vertices_length                    = 0;
        this.gravity_blocks                     = args.gravity_blocks;
        this.fluid_blocks                       = args.fluid_blocks;
        // Delete old WebGL buffers
        for(let key of Object.keys(this.vertices)) {
            let v = this.vertices[key];
            if(v.buffer) {
                v.buffer.destroy();
            }
            delete(this.vertices[key]);
        }
        // Добавление чанка в отрисовщик
        for(let key of Object.keys(args.vertices)) {
            let v = args.vertices[key];
            if(v.list.length > 0) {
                this.vertices_length  += v.list.length / GeometryTerrain.strideFloats;
                v.buffer              = new GeometryTerrain(v.list);
                this.vertices[key]   = v;
                delete(v.list);
            }
        }
        this.chunkManager.vertices_length_total += this.vertices_length;
        this.shift_orig            = args.shift;
        this.dirty                 = false;
        this.timers                = args.timers;
        this.doShift(Game.shift);
    }

    // destruct chunk
    destruct() {
        if(this.buffer) {
            this.buffer.destroy();
        }
        // Run webworker method
        this.chunkManager.postWorkerMessage(['destructChunk', {key: this.key}]);
    }

    // buildVertices
    buildVertices() {
        if(this.buildVerticesInProgress) {
            return;
        }
        this.buildVerticesInProgress = true;
        // Run webworker method
        this.chunkManager.postWorkerMessage(['buildVertices', {key: this.key, shift: Game.shift}]);
        return true;
    }

    // Get the type of the block at the specified position.
    // Mostly for neatness, since accessing the array
    // directly is easier and faster.
    getBlock(x, y, z) {
        if(!this.inited) {
            return BLOCK.DUMMY;
        }
        x -= this.coord.x;
        y -= this.coord.y;
        z -= this.coord.z;
        if(x < 0 || y < 0 || z < 0 || x >= this.size.x || y >= this.size.y || z >= this.size.z) {
            return BLOCK.DUMMY;
        };
        let block = this.blocks[x][z][y];
        if(!block) {
            return BLOCK.AIR;
        }
        if(typeof block == 'number') {
           block = BLOCK.BLOCK_BY_ID[block];
        }
        return block;
    }

    // setBlock
    setBlock(x, y, z, type, is_modify, power, rotate, entity_id, extra_data) {
        x -= this.coord.x;
        y -= this.coord.y;
        z -= this.coord.z;
        if(x < 0 || y < 0 || z < 0 || x >= this.size.x || y >= this.size.y || z >= this.size.z) {
            return;
        };
        // fix rotate
        if(rotate && typeof rotate === 'object') {
            rotate = new Vector(
                Math.round(rotate.x * 10) / 10,
                Math.round(rotate.y * 10) / 10,
                Math.round(rotate.z * 10) / 10
            );
        } else {
            rotate = null;
        }
        // fix power
        if(typeof power === 'undefined' || power === null) {
            power = 1.0;
        }
        power = Math.round(power * 10000) / 10000;
        if(power <= 0) {
            return;
        }
        //
        if(!is_modify) {
            type = {...BLOCK[type.name]};
            type.power      = power;
            type.rotate     = rotate;
            type.entity_id  = entity_id;
            type.texture    = null;
            type.extra_data = extra_data;
            if(type.gravity) {
                type.falling = true;
            }
            this.blocks[x][z][y] = type;
        }
        // type.extra_data = extra_data;
        // Run webworker method
        this.chunkManager.postWorkerMessage(['setBlock', {
            key:        this.key,
            x:          x + this.coord.x,
            y:          y + this.coord.y,
            z:          z + this.coord.z,
            type:       type,
            is_modify:  is_modify,
            power:      power,
            rotate:     rotate,
            extra_data: extra_data
        }]);
        if(x == 0) {
            // West neighbor
            let key = this.chunkManager.getPosChunkKey(new Vector(this.addr.x - 1, this.addr.y, this.addr.z));
            this.chunkManager.postWorkerMessage(['setBlock', {
                key:        key,
                x:          x + this.coord.x - 1,
                y:          y + this.coord.y,
                z:          z + this.coord.z,
                type:       null,
                is_modify:  is_modify,
                power:      power,
                rotate:     rotate
            }]);
        }
        if(z == 0) {
            // South neighbor
            let key = this.chunkManager.getPosChunkKey(new Vector(this.addr.x, this.addr.y, this.addr.z - 1));
            this.chunkManager.postWorkerMessage(['setBlock', {
                key:        key,
                x:          x + this.coord.x,
                y:          y + this.coord.y,
                z:          z + this.coord.z - 1,
                type:       null,
                is_modify:  is_modify,
                power:      power,
                rotate:     rotate
            }]);
        }
        if(x == this.size.x - 1) {
            // East neighbor
            let key = this.chunkManager.getPosChunkKey(new Vector(this.addr.x + 1, this.addr.y, this.addr.z));
            this.chunkManager.postWorkerMessage(['setBlock', {
                key:        key,
                x:          x + this.coord.x + 1,
                y:          y + this.coord.y,
                z:          z + this.coord.z,
                type:       null,
                is_modify:  is_modify,
                power:      power,
                rotate:     rotate
            }]);
        }
        if(z == this.size.z - 1) {
            // North neighbor
            let key = this.chunkManager.getPosChunkKey(new Vector(this.addr.x, this.addr.y, this.addr.z + 1));
            this.chunkManager.postWorkerMessage(['setBlock', {
                key:        key,
                x:          x + this.coord.x,
                y:          y + this.coord.y,
                z:          z + this.coord.z + 1,
                type:       null,
                is_modify:  is_modify,
                power:      power,
                rotate:     rotate
            }]);
        }

    }

}
