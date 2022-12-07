import { Building } from "../building.js";
import { DIRECTION, Vector } from "../../../helpers.js";
import { CubeSym } from "../../../core/CubeSym.js";
import { BLOCK } from "../../../blocks.js";
import { impl as alea } from "../../../../vendors/alea.js";

// Church
export class Church extends Building {

    static SIZE_LIST = [{x: 11, z: 21, door_pos: {x: 5, z: 0}, height: 27}];

    constructor(cluster, seed, coord, aabb, entrance, door_bottom, door_direction, size, random_size) {
        super(cluster, seed, coord, aabb, entrance, door_bottom, door_direction, size, random_size);
    }

    //
    addBlocks() {

        const random_size = this.random_size;
        const door_pos = random_size.door_pos;
        const dir = this.door_direction;

        // Bricks palette
        const bricks_palette = this.cluster.createPalette([
            {value: BLOCK.MOSSY_STONE_BRICKS, chance: .3},
            {value: BLOCK.COBBLESTONE, chance: .4},
            {value: BLOCK.MOSSY_COBBLESTONE, chance: .5},
            {value: BLOCK.STONE_BRICKS, chance: 1},
        ]);

        // Windows palette
        const windows_palette = this.cluster.createPalette([
            {value: BLOCK.ORANGE_STAINED_GLASS_PANE},
            {value: BLOCK.MAGENTA_STAINED_GLASS_PANE},
            {value: BLOCK.LIGHT_BLUE_STAINED_GLASS_PANE},
            {value: BLOCK.YELLOW_STAINED_GLASS_PANE},
            {value: BLOCK.LIME_STAINED_GLASS_PANE},
            {value: BLOCK.PINK_STAINED_GLASS_PANE},
            {value: BLOCK.CYAN_STAINED_GLASS_PANE},
            {value: BLOCK.PURPLE_STAINED_GLASS_PANE},
            {value: BLOCK.BLUE_STAINED_GLASS_PANE},
            {value: BLOCK.BROWN_STAINED_GLASS_PANE},
            {value: BLOCK.GREEN_STAINED_GLASS_PANE},
            {value: BLOCK.RED_STAINED_GLASS_PANE},
        ], true);

        //
        const pushBlocks = (blocks) => {
            for(let block of blocks) {
                block.move.x -= door_pos.x;
                block.move.z += door_pos.z;
            }
            this.blocks.list.push(...blocks);
        };

        // Clear area
        this.blocks.appendQuboidBlocks(new Vector(-door_pos.x - 1, 0, door_pos.z - 1), new Vector(random_size.x + 2, random_size.height + 1, random_size.z + 2), BLOCK.AIR.id, null, 8)

        // Часовня
        for(let y = 0; y < 13; y++) {
            pushBlocks([
                {move: new Vector(4, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(5, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(6, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(4, y, 19), block_id: bricks_palette.next().id},
                {move: new Vector(5, y, 19), block_id: bricks_palette.next().id},
                {move: new Vector(6, y, 19), block_id: bricks_palette.next().id},
                {move: new Vector(3, y, 16), block_id: bricks_palette.next().id},
                {move: new Vector(3, y, 17), block_id: bricks_palette.next().id},
                {move: new Vector(3, y, 18), block_id: bricks_palette.next().id},
                {move: new Vector(7, y, 16), block_id: bricks_palette.next().id},
                {move: new Vector(7, y, 17), block_id: bricks_palette.next().id},
                {move: new Vector(7, y, 18), block_id: bricks_palette.next().id},
            ]);
            for (let x = 4; x < 7; x++) {
                for (let z = 16; z < 19; z++) {
                    pushBlocks([
                        {move: new Vector(x, y, z), block_id: (y == 0) ? BLOCK.DARK_OAK_PLANKS.id : BLOCK.AIR.id}
                    ]);
                }
            }
            if (y > 0 && y < 10) {
                pushBlocks([
                    {move: new Vector(5, y, 17), block_id: BLOCK.DARK_OAK_LOG.id}
                ]);
            }
        }
        pushBlocks([
            {move: new Vector(6, 1, 17), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.NORTH, dir), y: 0, z: 0}},
            {move: new Vector(6, 2, 18), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(5, 2, 18), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
            {move: new Vector(4, 3, 18), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(4, 3, 17), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(4, 4, 16), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(5, 4, 16), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
            {move: new Vector(6, 5, 16), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(6, 5, 17), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.NORTH, dir), y: 0, z: 0}},
            {move: new Vector(6, 6, 18), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(5, 6, 18), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
            {move: new Vector(4, 7, 18), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(4, 7, 17), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(4, 8, 16), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(5, 8, 16), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
            {move: new Vector(6, 9, 16), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(6, 9, 17), block_id: BLOCK.DARK_OAK_SLAB.id},
            {move: new Vector(6, 9, 18), block_id: BLOCK.DARK_OAK_SLAB.id},
            
            {move: new Vector(3, 12, 15), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(7, 12, 15), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(3, 12, 19), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(7, 12, 19), block_id: BLOCK.BIRCH_SLAB.id},
            
            {move: new Vector(3, 13, 16), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(3, 13, 18), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(4, 13, 19), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(6, 13, 19), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(7, 13, 16), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(7, 13, 18), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(4, 13, 15), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(6, 13, 15), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            
            {move: new Vector(3, 14, 16), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(3, 14, 18), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(4, 14, 19), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(6, 14, 19), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(7, 14, 16), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(7, 14, 18), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(4, 14, 15), block_id: BLOCK.SPRUCE_FENCE.id},
            {move: new Vector(6, 14, 15), block_id: BLOCK.SPRUCE_FENCE.id},
            
            {move: new Vector(3, 15, 16), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(3, 15, 18), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(4, 15, 19), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(6, 15, 19), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(7, 15, 16), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(7, 15, 18), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(4, 15, 15), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(6, 15, 15), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            
            // Крыша
            {move: new Vector(4, 16, 15), block_id: bricks_palette.next().id},
            {move: new Vector(5, 16, 15), block_id: bricks_palette.next().id},
            {move: new Vector(6, 16, 15), block_id: bricks_palette.next().id},
            {move: new Vector(4, 16, 19), block_id: bricks_palette.next().id},
            {move: new Vector(5, 16, 19), block_id: bricks_palette.next().id},
            {move: new Vector(6, 16, 19), block_id: bricks_palette.next().id},
            {move: new Vector(3, 16, 16), block_id: bricks_palette.next().id},
            {move: new Vector(3, 16, 17), block_id: bricks_palette.next().id},
            {move: new Vector(3, 16, 18), block_id: bricks_palette.next().id},
            {move: new Vector(7, 16, 16), block_id: bricks_palette.next().id},
            {move: new Vector(7, 16, 17), block_id: bricks_palette.next().id},
            {move: new Vector(7, 16, 18), block_id: bricks_palette.next().id},
            
            {move: new Vector(4, 17, 15), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 17, 15), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 17, 15), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(4, 17, 19), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 17, 19), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 17, 19), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(3, 17, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(3, 17, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(3, 17, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(7, 17, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(7, 17, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(7, 17, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            
            {move: new Vector(5, 18, 15), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 18, 19), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(3, 18, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(7, 18, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            
            {move: new Vector(3, 18, 16), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.NORTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 18, 16), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.NORTH, dir), y: 0, z: 0}},
            
            {move: new Vector(3, 18, 18), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 18, 18), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            
            {move: new Vector(4, 18, 15), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
            {move: new Vector(4, 18, 19), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
            
            {move: new Vector(6, 18, 15), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
            {move: new Vector(6, 18, 19), block_id: BLOCK.DEEPSLATE_BRICKS_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
            
            {move: new Vector(4, 18, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 18, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(4, 18, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 18, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            
            {move: new Vector(5, 19, 15), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(5, 19, 19), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(3, 19, 17), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(7, 19, 17), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            
            {move: new Vector(4, 19, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 19, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 19, 16), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(4, 19, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 19, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 19, 18), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(4, 19, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(6, 19, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            
            {move: new Vector(5, 20, 16), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(5, 20, 18), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(4, 20, 17), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(6, 20, 17), block_id: BLOCK.DEEPSLATE_TILE_WALL.id},
            {move: new Vector(5, 20, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            {move: new Vector(5, 21, 17), block_id: BLOCK.DEEPSLATE_BRICKS.id},
            
            // реликвия
            {move: new Vector(5, 19, 17), block_id: BLOCK.CHAIN.id},
            {move: new Vector(5, 18, 17), block_id: BLOCK.CHAIN.id},
            {move: new Vector(5, 17, 17), block_id: BLOCK.CHAIN.id},
            {move: new Vector(5, 16, 17), block_id: BLOCK.CHAIN.id},
            {move: new Vector(5, 15, 17), block_id: BLOCK.AMETHYST_CLUSTER.id},
            {move: new Vector(5, 14, 17), block_id: BLOCK.AMETHYST_BLOCK.id},
            {move: new Vector(5, 13, 17), block_id: BLOCK.AMETHYST_CLUSTER.id, rotate:{x:0, y: -1, z: 0}},
        ]);

        // стены
        for (let y = 0; y < 5; y++) {
            pushBlocks([
                {move: new Vector(1, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 2), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 3), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 5), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 6), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 7), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 9), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 10), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 11), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 13), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 14), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 2), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 3), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 5), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 6), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 7), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 9), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 10), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 11), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 13), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 14), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 15), block_id: bricks_palette.next().id},
                
                {move: new Vector(1, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(2, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(3, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(7, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(8, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 1), block_id: bricks_palette.next().id},
                {move: new Vector(1, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(2, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(3, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(7, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(8, y, 15), block_id: bricks_palette.next().id},
                {move: new Vector(9, y, 15), block_id: bricks_palette.next().id},
            ]);
            if (y == 0 || y == 4) {
                pushBlocks([
                    {move: new Vector(1, y, 4), block_id: bricks_palette.next().id},
                    {move: new Vector(1, y, 8), block_id: bricks_palette.next().id},
                    {move: new Vector(1, y, 12), block_id: bricks_palette.next().id},
                    {move: new Vector(9, y, 4), block_id: bricks_palette.next().id},
                    {move: new Vector(9, y, 8), block_id: bricks_palette.next().id},
                    {move: new Vector(9, y, 12), block_id: bricks_palette.next().id},
                ]);
            }
        }

        // крыша
        pushBlocks([
            {move: new Vector(4, 4, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
            {move: new Vector(6, 4, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
        
            {move: new Vector(1, 5, 1), block_id: bricks_palette.next().id},
            {move: new Vector(2, 5, 1), block_id: bricks_palette.next().id},
            {move: new Vector(3, 5, 1), block_id: bricks_palette.next().id},
            {move: new Vector(7, 5, 1), block_id: bricks_palette.next().id},
            {move: new Vector(8, 5, 1), block_id: bricks_palette.next().id},
            {move: new Vector(9, 5, 1), block_id: bricks_palette.next().id},
            
            {move: new Vector(1, 6, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(2, 6, 1), block_id: bricks_palette.next().id},
            {move: new Vector(3, 6, 1), block_id: bricks_palette.next().id},
            {move: new Vector(4, 6, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}, extra_data: {point: {x:0, y:0.6, z:0}}},
            {move: new Vector(6, 6, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0},  extra_data: {point: {x:0, y:0.6, z:0}}},
            {move: new Vector(7, 6, 1), block_id: bricks_palette.next().id},
            {move: new Vector(8, 6, 1), block_id: bricks_palette.next().id},
            {move: new Vector(9, 6, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            {move: new Vector(4, 3, 1), block_id: bricks_palette.next().id},
            {move: new Vector(5, 3, 1), block_id: bricks_palette.next().id},
            {move: new Vector(6, 3, 1), block_id: bricks_palette.next().id},
            
            {move: new Vector(4, 2, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}, extra_data: {point: {x:0, y:0.6, z:0}}},
            {move: new Vector(6, 2, 1), block_id: BLOCK.STONE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0},  extra_data: {point: {x:0, y:0.6, z:0}}},
            
            {move: new Vector(2, 7, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(3, 7, 1), block_id: bricks_palette.next().id},
            {move: new Vector(4, 7, 1), block_id: bricks_palette.next().id},
            {move: new Vector(5, 7, 1), block_id: bricks_palette.next().id},
            {move: new Vector(6, 7, 1), block_id: bricks_palette.next().id},
            {move: new Vector(7, 7, 1), block_id: bricks_palette.next().id},
            {move: new Vector(8, 7, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            {move: new Vector(3, 8, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(4, 8, 1), block_id: bricks_palette.next().id},
            {move: new Vector(5, 8, 1), block_id: bricks_palette.next().id},
            {move: new Vector(6, 8, 1), block_id: bricks_palette.next().id},
            {move: new Vector(7, 8, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            {move: new Vector(4, 9, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(5, 9, 1), block_id: bricks_palette.next().id},
            {move: new Vector(6, 9, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(5, 10, 1), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            
            {move: new Vector(1, 5, 15), block_id: bricks_palette.next().id},
            {move: new Vector(2, 5, 15), block_id: bricks_palette.next().id},
            {move: new Vector(3, 5, 15), block_id: bricks_palette.next().id},
            {move: new Vector(7, 5, 15), block_id: bricks_palette.next().id},
            {move: new Vector(8, 5, 15), block_id: bricks_palette.next().id},
            {move: new Vector(9, 5, 15), block_id: bricks_palette.next().id},
            
            {move: new Vector(1, 6, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(2, 6, 15), block_id: bricks_palette.next().id},
            {move: new Vector(3, 6, 15), block_id: bricks_palette.next().id},
            {move: new Vector(7, 6, 15), block_id: bricks_palette.next().id},
            {move: new Vector(8, 6, 15), block_id: bricks_palette.next().id},
            {move: new Vector(9, 6, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            {move: new Vector(2, 7, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(3, 7, 15), block_id: bricks_palette.next().id},
            {move: new Vector(7, 7, 15), block_id: bricks_palette.next().id},
            {move: new Vector(8, 7, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
            
            {move: new Vector(3, 8, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
            {move: new Vector(7, 8, 15), block_id: BLOCK.COBBLESTONE_WALL.id},
        ]);
        for (let z = 2; z < 15; z++) {
            pushBlocks([
                {move: new Vector(1, 5, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
                {move: new Vector(2, 6, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
                {move: new Vector(3, 7, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
                {move: new Vector(4, 8, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.EAST, dir), y: 0, z: 0}},
                {move: new Vector(5, 9, z), block_id: (z%2 == 0) ? BLOCK.DEEPSLATE_BRICK_SLAB.id : BLOCK.DEEPSLATE_BRICKS.id},
                {move: new Vector(6, 8, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
                {move: new Vector(7, 7, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
                {move: new Vector(8, 6, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
                {move: new Vector(9, 5, z), block_id: BLOCK.DEEPSLATE_BRICK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.WEST, dir), y: 0, z: 0}},
                
                {move: new Vector(1, 0, z), block_id: bricks_palette.next().id},
                {move: new Vector(9, 0, z), block_id: bricks_palette.next().id},
                
                {move: new Vector(1, 4, z), block_id: bricks_palette.next().id},
                {move: new Vector(9, 4, z), block_id: bricks_palette.next().id},
            ]);
        }

        // Полы
        for (let x = 2; x < 9; x++) {
            for (let z = 2; z < 13; z++) {
                pushBlocks([
                    {move: new Vector(x, -1, z), block_id: BLOCK.BIRCH_PLANKS.id}
                ]);
            }
        }

        // алтарь
        pushBlocks([
            {move: new Vector(2, 0, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(4, 0, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 0, 13), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(0, dir), y: 0, z: 0}},
            {move: new Vector(7, 0, 13), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(0, dir), y: 0, z: 0}},
            {move: new Vector(5, 0, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(6, 0, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(8, 0, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(2, 1, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(4, 1, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(4, 2, 13), block_id: BLOCK.BLUE_CANDLE.id},
            {move: new Vector(5, 1, 13), block_id: BLOCK.LECTERN.id, 
                rotate: {x: this.wrapRotation(2, dir), y: 0, z: 0},
                extra_data: {
                    page: 0,
                    book: {
                        id: 'church_book',
                        pages: [
                            {
                                text: 'Церковь построена в 2022 году'
                            },
                            {
                                text: 'Страница #2'
                            }
                        ],
                        author: 'Username',
                        title: 'Test book',
                        resolved: 1
                    }
                }
            },
            {move: new Vector(6, 1, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(6, 2, 13), block_id: BLOCK.RED_CANDLE.id},
            {move: new Vector(8, 1, 13), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(2, 2, 13), block_id: BLOCK.SPRUCE_SLAB.id},
            // {move: new Vector(4, 2, 13), block_id: BLOCK.SPRUCE_SLAB.id},
            // {move: new Vector(6, 2, 13), block_id: BLOCK.SPRUCE_SLAB.id},
            {move: new Vector(8, 2, 13), block_id: BLOCK.SPRUCE_SLAB.id},
            {move: new Vector(2, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(3, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(4, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(5, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(6, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(7, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(8, 0, 14), block_id: BLOCK.DARK_OAK_PLANKS.id},
            
            {move: new Vector(4, 1, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(4, 2, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(5, 1, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(5, 2, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(5, 3, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(6, 2, 15), block_id: BLOCK.AIR.id},
            {move: new Vector(6, 1, 15), block_id: BLOCK.AIR.id},
            
            {move: new Vector(4, 0, 15), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(5, 0, 15), block_id: BLOCK.DARK_OAK_PLANKS.id},
            {move: new Vector(6, 0, 15), block_id: BLOCK.DARK_OAK_PLANKS.id},
        ]);

        // стекла
        pushBlocks([
            {move: new Vector(1, 1, 4), block_id: windows_palette.next().id},
            {move: new Vector(1, 2, 4), block_id: windows_palette.next().id},
            {move: new Vector(1, 3, 4), block_id: windows_palette.next().id},
            
            {move: new Vector(1, 1, 8), block_id: windows_palette.next().id},
            {move: new Vector(1, 2, 8), block_id: windows_palette.next().id},
            {move: new Vector(1, 3, 8), block_id: windows_palette.next().id},
            
            {move: new Vector(1, 1, 12), block_id: windows_palette.next().id},
            {move: new Vector(1, 2, 12), block_id: windows_palette.next().id},
            {move: new Vector(1, 3, 12), block_id: windows_palette.next().id},
            
            {move: new Vector(9, 1, 4), block_id: windows_palette.next().id},
            {move: new Vector(9, 2, 4), block_id: windows_palette.next().id},
            {move: new Vector(9, 3, 4), block_id: windows_palette.next().id},
            
            {move: new Vector(9, 1, 8), block_id: windows_palette.next().id},
            {move: new Vector(9, 2, 8), block_id: windows_palette.next().id},
            {move: new Vector(9, 3, 8), block_id: windows_palette.next().id},
            
            {move: new Vector(9, 1, 12), block_id: windows_palette.next().id},
            {move: new Vector(9, 2, 12), block_id: windows_palette.next().id},
            {move: new Vector(9, 3, 12), block_id: windows_palette.next().id},
        ]);

        // Лавочки
        pushBlocks([
            {move: new Vector(2, 0, 4), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(3, 0, 4), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 0, 4), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(8, 0, 4), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(2, 0, 6), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(3, 0, 6), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 0, 6), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(8, 0, 6), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(2, 0, 8), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(3, 0, 8), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 0, 8), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(8, 0, 8), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(2, 0, 10), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(3, 0, 10), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(7, 0, 10), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(8, 0, 10), block_id: BLOCK.DARK_OAK_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
        ]);

        // Дверь входная
        pushBlocks([
            {move: new Vector(3, 0, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 1, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 2, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 3, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 4, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 5, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(3, 6, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 0, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 1, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 2, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 3, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 4, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 5, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(7, 6, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            
            {move: new Vector(4, 3, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(5, 3, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(6, 3, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            
            {move: new Vector(4, 7, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(5, 7, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            {move: new Vector(6, 7, 2), block_id: BLOCK.STRIPPED_BIRCH_WOOD.id},
            
            {move: new Vector(4, 4, 2), block_id: BLOCK.YELLOW_STAINED_GLASS_PANE.id},
            {move: new Vector(5, 4, 2), block_id: BLOCK.LIME_STAINED_GLASS_PANE.id},
            {move: new Vector(6, 4, 2), block_id: BLOCK.ORANGE_STAINED_GLASS_PANE.id},
            {move: new Vector(4, 5, 2), block_id: BLOCK.LIME_STAINED_GLASS_PANE.id},
            {move: new Vector(5, 5, 2), block_id: BLOCK.LIGHT_BLUE_STAINED_GLASS_PANE.id},
            {move: new Vector(6, 5, 2), block_id: BLOCK.PINK_STAINED_GLASS_PANE.id},
            {move: new Vector(4, 6, 2), block_id: BLOCK.YELLOW_STAINED_GLASS_PANE.id},
            {move: new Vector(5, 6, 2), block_id: BLOCK.LIGHT_BLUE_STAINED_GLASS_PANE.id},
            {move: new Vector(6, 6, 2), block_id: BLOCK.GRAY_STAINED_GLASS_PANE.id},
            
            {move: new Vector(4, 0, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(4, 1, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(4, 2, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(6, 0, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(6, 1, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(6, 2, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
            {move: new Vector(5, 2, 2), block_id: BLOCK.BIRCH_STAIRS.id, rotate: {x: this.wrapRotation(DIRECTION.SOUTH, dir), y: 0, z: 0}},
        ]);

        // Ковер
        for (let x = 4; x < 7; x++) {
            for (let z = 3; z < 12; z++) {
                pushBlocks([
                    {move: new Vector(x, 0, z), block_id: BLOCK.RED_CARPET.id}
                ]);
            }
        }

        // Освещение
        pushBlocks([
            {move: new Vector(2, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(3, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(4, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(5, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(6, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(7, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(8, 5, 5), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(3, 4, 5), block_id: BLOCK.LANTERN.id, rotate: {x: 0, y: -1, z: 0}},
            {move: new Vector(7, 4, 5), block_id: BLOCK.LANTERN.id, rotate: {x: 0, y: -1, z: 0}},
            
            {move: new Vector(2, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(3, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(4, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(5, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(6, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(7, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(8, 5, 10), block_id: BLOCK.BIRCH_SLAB.id},
            {move: new Vector(3, 4, 10), block_id: BLOCK.LANTERN.id, rotate: {x: 0, y: -1, z: 0}},
            {move: new Vector(7, 4, 10), block_id: BLOCK.LANTERN.id, rotate: {x: 0, y: -1, z: 0}},
            
            {move: new Vector(6, 3, 17), block_id: BLOCK.TORCH.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(4, 5, 17), block_id: BLOCK.TORCH.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(6, 7, 17), block_id: BLOCK.TORCH.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
        ]);

        // Декор
        pushBlocks([
            {move: new Vector(4, 1, 17), block_id: BLOCK.NOTE_BLOCK.id}, // бочка / свеча
            {move: new Vector(4, 2, 17), block_id: BLOCK.WHITE_CANDLE.id},
            
            // Банеры
            {move: new Vector(2, 3, 6), block_id: BLOCK.RED_BANNER.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(2, 3, 10), block_id: BLOCK.RED_BANNER.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(8, 3, 6), block_id: BLOCK.RED_BANNER.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(8, 3, 10), block_id: BLOCK.RED_BANNER.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            
            // столбы
            {move: new Vector(3, 0, 0), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(7, 0, 0), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(0, 0, 2), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(0, 0, 2), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(0, 0, 6), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(0, 0, 10), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(0, 0, 14), block_id: BLOCK.LODESTONE.id},
            
            {move: new Vector(10, 0, 2), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(10, 0, 6), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(10, 0, 10), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(10, 0, 14), block_id: BLOCK.LODESTONE.id},
            
            {move: new Vector(2, 0, 17), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(5, 0, 20), block_id: BLOCK.LODESTONE.id},
            {move: new Vector(8, 0, 17), block_id: BLOCK.LODESTONE.id},
            
            {move: new Vector(3, 1, 0), block_id: bricks_palette.next().id},
            {move: new Vector(7, 1, 0), block_id: bricks_palette.next().id},
            {move: new Vector(0, 1, 2), block_id: bricks_palette.next().id},
            {move: new Vector(0, 1, 2), block_id: bricks_palette.next().id},
            {move: new Vector(0, 1, 6), block_id: bricks_palette.next().id},
            {move: new Vector(0, 1, 10), block_id: bricks_palette.next().id},
            {move: new Vector(0, 1, 14), block_id: bricks_palette.next().id},
            
            {move: new Vector(10, 1, 2), block_id: bricks_palette.next().id},
            {move: new Vector(10, 1, 2), block_id: bricks_palette.next().id},
            {move: new Vector(10, 1, 6), block_id: bricks_palette.next().id},
            {move: new Vector(10, 1, 10), block_id: bricks_palette.next().id},
            {move: new Vector(10, 1, 14), block_id: bricks_palette.next().id},
            
            {move: new Vector(2, 1, 17), block_id: bricks_palette.next().id},
            {move: new Vector(5, 1, 20), block_id: bricks_palette.next().id},
            {move: new Vector(8, 1, 17), block_id: bricks_palette.next().id},
            
            {move: new Vector(2, 2, 17), block_id: bricks_palette.next().id},
            {move: new Vector(5, 2, 20), block_id: bricks_palette.next().id},
            {move: new Vector(8, 2, 17), block_id: bricks_palette.next().id},

            {move: new Vector(3, 2, 0), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.NORTH, dir), 0, 0)},
            {move: new Vector(7, 2, 0), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.NORTH, dir), 0, 0)},
            
            {move: new Vector(0, 2, 2), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(0, 2, 6), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(0, 2, 10), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(0, 2, 14), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            {move: new Vector(2, 3, 17), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.EAST, dir), 0, 0)},
            
            {move: new Vector(10, 2, 2), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(10, 2, 6), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(10, 2, 10), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(10, 2, 14), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            {move: new Vector(8, 3, 17), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.WEST, dir), 0, 0)},
            
             {move: new Vector(5, 3, 20), block_id: BLOCK.STONE_STAIRS.id, rotate: new Vector(this.wrapRotation(DIRECTION.SOUTH, dir), 0, 0)},
             
            // кресты
            {move: new Vector(5, 10, 1), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 11, 1), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 12, 1), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 13, 1), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(4, 12, 1), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(6, 12, 1), block_id: BLOCK.BIRCH_FENCE.id},
            
            {move: new Vector(5, 22, 17), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 23, 17), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 24, 17), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(5, 25, 17), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(4, 24, 17), block_id: BLOCK.BIRCH_FENCE.id},
            {move: new Vector(6, 24, 17), block_id: BLOCK.BIRCH_FENCE.id},
            
            // свеча слева
            {move: new Vector(8, 1, 2), block_id: BLOCK.BIRCH_PLANKS.id}, // бочка / свеча
            {move: new Vector(8, 2, 2), block_id: BLOCK.GREEN_CANDLE.id},
        ]);

        // растительность
        pushBlocks([
            // {move: new Vector(0, 0, 1), block_id: BLOCK.ROSE_BUSH.id},
            // {move: new Vector(10, 0, 8), block_id: BLOCK.ROSE_BUSH.id},
            
            {move: new Vector(2, 0, 0), block_id: BLOCK.FLOWERING_AZALEA_LEAVES.id},
            {move: new Vector(2, 1, 0), block_id: BLOCK.FLOWERING_AZALEA_LEAVES.id},
            {move: new Vector(8, 0, 0), block_id: BLOCK.FLOWERING_AZALEA_LEAVES.id},
            {move: new Vector(8, 1, 0), block_id: BLOCK.FLOWERING_AZALEA_LEAVES.id},
        ]);

        // door
        const door_random = new alea(this.door_bottom.toHash());
        this.blocks.appendDoorBlocks(new Vector(0, 0, door_pos.z + 2), BLOCK.SPRUCE_DOOR.id, dir, door_random.double() > .5, true);

    }

    /**
     * @param { import("../base.js").ClusterBase } cluster
     * @param {*} chunk 
     */
    draw(cluster, chunk) {
        super.draw(cluster, chunk);
        this.blocks.draw(cluster, chunk);
    }
    
    wrapRotation(angle, dir) {
        return CubeSym.dirAdd(dir, angle);
    }

}