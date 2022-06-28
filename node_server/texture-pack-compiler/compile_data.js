import {Color} from "../../www/js/helpers.js";
import { COLOR_PALETTE, Resources } from "../../www/js/resources.js";

const START_WOOL_ID             = 350; // ... 365
const START_CARPET_ID           = 800; // ... 815
const START_BUTTON_ID           = 770; // ...799
const START_BED_ID              = 1200; // ...1215
const START_TERRACOTTA          = 1300; // 1315
const START_GLAZED_TERRACOTTA   = 1400; // 1415

// CompileData
export class CompileData {

    constructor(compile_json) {
        Object.assign(this, compile_json);
    }

    //
    getBlock(name) {
        for(let block of this.blocks) {
            if(block.name == name) {
                return block;
            }
        }
        return null;
    }

    async init() {
        await this.initDiscs();
        this.initWool();
        this.initCarpets();
        this.initButtons();
        this.initTerracotta();
        this.initBed();
        this.initGlazedTerracotta();
        this.initSpawnEggs();
    }

    async initDiscs() {
        // Load music discs
        for(let disc of await Resources.loadMusicDiscs()) {
            const b = {
                "id": disc.id,
                "name": "MUSIC_DISC_" + (disc.id - 900),
                "title": disc.title,
                "style": "extruder",
                "item": {"name": "music_disc"},
                "max_in_stack": 1,
                "material": {"id": "iron"},
                "texture": {"side": "item/music_disc_strad.png"}
            };
            this.blocks.push(b);
        }
    }

    // Wools
    initWool() {
        const palette_pos = {x: 24, y: 31};
        let i = 0;
        for(let color in COLOR_PALETTE) {
            const color_pos = COLOR_PALETTE[color];
            const mask_color = new Color(color_pos[0], color_pos[1], 0, 1);
            const TX_CNT = 32;
            mask_color.r = (palette_pos.x + 0.25 * mask_color.r + 0.125) / TX_CNT;
            mask_color.g = (palette_pos.y + 0.25 * mask_color.g + 0.125) / TX_CNT;
            const b = {
                "id": START_WOOL_ID + i,
                "name": color.toUpperCase() + '_WOOL',
                "material": {"id": "wool"},
                "sound": "madcraft:block.cloth",
                "texture": {"side": "block/white_wool.png"},
                "mask_color": mask_color,
                "tags": [
                    "can_put_info_pot",
                    "mask_color"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Buttons
    initButtons() {
        let i = 0;
        const materials = [
            this.getBlock('OAK_PLANK'),
            this.getBlock('BIRCH_PLANK'),
            this.getBlock('SPRUCE_PLANK'),
            this.getBlock('ACACIA_PLANK'),
            this.getBlock('JUNGLE_PLANK'),
            this.getBlock('DARK_OAK_PLANK'),
            this.getBlock('WARPED_PLANK'),
            this.getBlock('CONCRETE')
        ];
        for(let mat of materials) {
            let name_prefix = mat.name.replace('_PLANK', '');
            const b = {
                "id": START_BUTTON_ID + i,
                "name": name_prefix + '_BUTTON',
                "material": mat.material,
                "sound": mat.sound,
                "texture": mat.texture,
                "width": 0.375,
                "height": 0.125,
                "depth": 0.25,
                "can_rotate": true,
                "transparent": true,
                "extra_data": {pressed: 0},
                "tags": [
                    "no_drop_ao",
                    "rotate_by_pos_n",
                    "button"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Beds
    initBed() {
        const palette_pos = {x: 24, y: 31};
        let i = 0;
        for(let color in COLOR_PALETTE) {
            const color_pos = COLOR_PALETTE[color];
            const mask_color = new Color(color_pos[0], color_pos[1], 0, 1);
            const TX_CNT = 32;
            mask_color.r = (palette_pos.x + 0.25 * mask_color.r + 0.125) / TX_CNT;
            mask_color.g = (palette_pos.y + 0.25 * mask_color.g + 0.125) / TX_CNT;
            const b = {
                "id": START_BED_ID + i,
                "name": color.toUpperCase() + '_BED',
                "material": {"id": "wood"},
                "style": "bed",
                "height": 0.5,
                "max_in_stack": 1,
                "sound": "madcraft:block.wood",
                "transparent": true,
                "texture": {
                    "side": "16|28"
                },
                "can_rotate": true,
                "inventory": {
                    "style": "extruder",
                    "texture": "14|30"
                },
                "mask_color": mask_color,
                "tags": [
                    "bed",
                    "rotate_by_pos_n",
                    "mask_color"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Терракота (terracotta)
    initTerracotta() {
        const palette_pos = {x: 24, y: 31};
        let i = 0;
        for(let color in COLOR_PALETTE) {
            const color_pos = COLOR_PALETTE[color];
            const mask_color = new Color(color_pos[0], color_pos[1], 0, 1);
            const TX_CNT = 32;
            mask_color.r = (palette_pos.x + 0.25 * mask_color.r + 0.125) / TX_CNT;
            mask_color.g = (palette_pos.y + 0.25 * mask_color.g + 0.125) / TX_CNT;
            const b = {
                "id": START_TERRACOTTA + i,
                "name": color.toUpperCase() + '_TERRACOTTA',
                "material": {"id": "stone"},
                "sound": "madcraft:block.stone",
                "texture": {"side": "block/white_terracotta.png"},
                "mask_color": mask_color,
                "tags": [
                    "can_put_info_pot",
                    "mask_color"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Carpets
    initCarpets() {
        const palette_pos = {x: 24, y: 31};
        let i = 0;
        for(let color in COLOR_PALETTE) {
            const color_pos = COLOR_PALETTE[color];
            const mask_color = new Color(color_pos[0], color_pos[1], 0);
            const TX_CNT = 32;
            mask_color.r = (palette_pos.x + 0.25 * mask_color.r + 0.125) / TX_CNT;
            mask_color.g = (palette_pos.y + 0.25 * mask_color.g + 0.125) / TX_CNT;
            const b = {
                "id": START_CARPET_ID + i,
                "transparent": true,
                "height": 1/16,
                "can_rotate": true,
                "name": color.toUpperCase() + '_CARPET',
                "material": {"id": "wool"},
                "sound": "madcraft:block.cloth",
                "texture": {"side": "block/white_wool.png"},
                "mask_color": mask_color,
                "tags": [
                    "mask_color",
                    "carpet",
                    "rotate_by_pos_n",
                    "no_drop_ao"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Glazed terracotta
    initGlazedTerracotta() {
        // const first_pos = {x: 29, y: 6};
        let i = 0;
        for(let color in COLOR_PALETTE) {
            const name = color.toUpperCase() + '_GLAZED_TERRACOTTA';
            const name_lower = name.toLowerCase();
            const b = {
                "id": START_GLAZED_TERRACOTTA + i,
                "name": name,
                "material": {"id": "stone"},
                "sound": "madcraft:block.stone",
                "uvlock": false,
                "texture": {
                    "side":     `block/${name_lower}.png`,
                    "up":       `block/${name_lower}.png;rc1`,
                    "north":    `block/${name_lower}.png;rc1`,
                    "south":    `block/${name_lower}.png;rc1`,
                    "west":     `block/${name_lower}.png`,
                },
                "compile": {
                    "add_3pos": {
                        "up":       0,
                        "north":    0,
                        "south":    3,
                        "west":     3,
                    },
                },
                "can_rotate": true,
                "tags": [
                    "can_put_info_pot"
                ]
            };
            this.blocks.push(b);
            i++;
        }
    }

    // Spawn eggs
    initSpawnEggs() {

        const colors = {
            alay: {base: '#00DAFF', overlay: '#00ADFF'},
            axolotl: {base: '#FBC1E3', overlay: '#A62D74'},
            bat: {base: '#4C3E30', overlay: '#0F0F0F'},
            bee: {base: '#EDC343', overlay: '#43241B'},
            blaze: {base: '#F6B201', overlay: '#FFF87E'},
            cat: {base: '#EFC88E', overlay: '#957256'},
            cave_spider: {base: '#0C424E', overlay: '#A80E0E'},
            chicken: {base: '#A1A1A1', overlay: '#FF0000'},
            cod: {base: '#C1A76A', overlay: '#E5C48B'},
            cow: {base: '#443626', overlay: '#A1A1A1'},
            creeper: {base: '#0DA70B', overlay: '#000000'},
            dolphin: {base: '#223B4D', overlay: '#F9F9F9'},
            donkey: {base: '#534539', overlay: '#867566'},
            drowned: {base: '#8FF1D7', overlay: '#799C65'},
            elder_guardian: {base: '#CECCBA', overlay: '#747693'},
            enderman: {base: '#161616', overlay: '#000000'},
            endermite: {base: '#161616', overlay: '#6E6E6E'},
            evoker: {base: '#959B9B', overlay: '#1E1C1A'},
            fox: {base: '#D5B69F', overlay: '#CC6920'},
            frog: {base: '#D07444', overlay: '#FFC77C'},
            ghast: {base: '#F9F9F9', overlay: '#BCBCBC'},
            glow_squid: {base: '#095656', overlay: '#85F1BC'},
            goat: {base: '#A5947C', overlay: '#55493E'},
            guardian: {base: '#5A8272', overlay: '#F17D30'},
            hoglin: {base: '#C66E55', overlay: '#5F6464'},
            horse: {base: '#C09E7D', overlay: '#EEE500'},
            husk: {base: '#797061', overlay: '#E6CC94'},
            llama: {base: '#C09E7D', overlay: '#995F40'},
            magma_cube: {base: '#340000', overlay: '#FCFC00'},
            mooshroom: {base: '#A00F10', overlay: '#B7B7B7'},
            mule: {base: '#1B0200', overlay: '#51331D'},
            ocelot: {base: '#EFDE7D', overlay: '#564434'},
            panda: {base: '#E7E7E7', overlay: '#1B1B22'},
            parrot: {base: '#0DA70B', overlay: '#FF0000'},
            phantom: {base: '#43518A', overlay: '#88FF00'},
            pig: {base: '#F0A5A2', overlay: '#DB635F'},
            piglin: {base: '#995F40', overlay: '#F9F3A4'},
            piglin_brute: {base: '#592A10', overlay: '#F9F3A4'},
            pillager: {base: '#532F36', overlay: '#959B9B'},
            polar_bear: {base: '#F2F2F2', overlay: '#959590'},
            pufferfish: {base: '#F6B201', overlay: '#37C3F2'},
            rabbit: {base: '#995F40', overlay: '#734831'},
            ravager: {base: '#757470', overlay: '#5B5049'},
            salmon: {base: '#A00F10', overlay: '#0E8474'},
            sheep: {base: '#E7E7E7', overlay: '#FFB5B5'},
            shulker: {base: '#946794', overlay: '#4D3852'},
            silverfish: {base: '#6E6E6E', overlay: '#303030'},
            skeleton: {base: '#C1C1C1', overlay: '#494949'},
            skeleton_horse: {base: '#68684F', overlay: '#E5E5D8'},
            slime: {base: '#51A03E', overlay: '#7EBF6E'},
            spider: {base: '#342D27', overlay: '#A80E0E'},
            squid: {base: '#223B4D', overlay: '#708899'},
            stray: {base: '#617677', overlay: '#DDEAEA'},
            strider: {base: '#9C3436', overlay: '#4D494D'},
            tadpole: {base: '#6D533D', overlay: '#160A00'},
            trader_llama: {base: '#EAA430', overlay: '#456296'},
            tropical_fish: {base: '#EF6915', overlay: '#FFF9EF'},
            turtle: {base: '#E7E7E7', overlay: '#00AFAF'},
            vex: {base: '#7A90A4', overlay: '#E8EDF1'},
            villager: {base: '#563C33', overlay: '#BD8B72'},
            vindicator: {base: '#959B9B', overlay: '#275E61'},
            wandering_trader: {base: '#456296', overlay: '#EAA430'},
            warden: {base: '#0F4649', overlay: '#39D6E0'},
            witch: {base: '#340000', overlay: '#51A03E'},
            wither_skeleton: {base: '#141414', overlay: '#474D4D'},
            wolf: {base: '#D7D3D3', overlay: '#CEAF96'},
            zoglin: {base: '#C66E55', overlay: '#E6E6E6'},
            zombie: {base: '#00AFAF', overlay: '#799C65'},
            zombie_horse: {base: '#315234', overlay: '#97C284'},
            zombified_piglin: {base: '#EA9393', overlay: '#4C7129'},
            zombie_villager: {base: '#563C33', overlay: '#799C65'},
            //
            deer: {base: '#9d9186', overlay: '#4a3f35'},
            snow_golem: {base: '#a5d8d8', overlay: '#96500a'}
        };

        const eggs = [
            {id: 521, type: 'chicken', skin: 'base'},
            {id: 522, type: 'creeper', skin: 'base'},
            {id: 523, type: 'pig', skin: 'base'},
            {id: 524, type: 'horse', skin: 'creamy'},
            {id: 525, type: 'donkey', skin: 'base'},
            {id: 651, type: 'fox', skin: 'base'},
            {id: 1448, type: 'skeleton', skin: 'base'},
            {id: 1449, type: 'axolotl', skin: 'base'},
            {id: 1450, type: 'bee', skin: 'base'},
            {id: 1451, type: 'cow', skin: 'base'},
            {id: 1453, type: 'goat', skin: 'base'},
            {id: 1454, type: 'hoglin', skin: 'base'},
            {id: 1455, type: 'ocelot', skin: 'base'},
            {id: 1456, type: 'panda', skin: 'base'},
            {id: 1457, type: 'piglin', skin: 'base'},
            {id: 1458, type: 'sheep', skin: 'base'},
            //
            {id: 1452, type: 'deer', skin: 'base'},
            {id: 1459, type: 'snow_golem', skin: 'base'},
            /*
            Under construction:
            - bat
            - spider
            - pillager
            */
        ];
        for(let egg of eggs) {
            const color = colors[egg.type];
            const b = {
                "id": egg.id,
                "name": "SPAWN_EGG_" + egg.type.toUpperCase(),
                "style": "extruder",
                "material": {
                    "id": "bone"
                },
                "spawn_egg": {
                    "type": egg.type,
                    "skin": egg.skin
                },
                "compile": {
                    overlay_color: color.base,
                    layers: [
                        {image: 'item/spawn_egg_overlay.png', overlay_color: color.overlay}
                    ]
                },
                "texture": {
                    "id": "default",
                    "side": `item/spawn_egg.png;type=${egg.type}` // disable cache for every egg
                }
            };
            this.blocks.push(b);
        }
    }

}