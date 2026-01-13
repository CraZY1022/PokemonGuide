"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_types_1 = require("../../constants/pokemon-types");
Component({
    properties: {
        type: {
            type: String,
            observer: 'updateStyle'
        },
        size: {
            type: String,
            value: 'small'
        }
    },
    data: {
        typeName: '',
        bgColor: ''
    },
    methods: {
        updateStyle(newType) {
            console.log('[TypeBadge] updateStyle called with:', newType);
            if (!newType)
                return;
            // Create Reverse Map safely
            const reverseMap = {};
            const keys = Object.keys(pokemon_types_1.TYPE_NAMES_ZH);
            keys.forEach(key => {
                const zhName = pokemon_types_1.TYPE_NAMES_ZH[key];
                reverseMap[zhName] = key;
            });
            // Console log reverse map only once or if needed (verbose)
            // console.log('[TypeBadge] Reverse Map:', reverseMap)
            let matchedType = null;
            // 1. Try Direct English Match (Case Insensitive)
            const typeKey = newType.toLowerCase();
            const enumKey = typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
            if (pokemon_types_1.TYPE_COLORS[enumKey]) {
                console.log(`[TypeBadge] Matched via English: ${enumKey}`);
                matchedType = enumKey;
            }
            // 2. Try Chinese Match
            else if (reverseMap[newType]) {
                console.log(`[TypeBadge] Matched via Chinese Reverse: ${newType} -> ${reverseMap[newType]}`);
                matchedType = reverseMap[newType];
            }
            else {
                console.warn(`[TypeBadge] No match found for: ${newType}`);
            }
            if (matchedType) {
                const color = pokemon_types_1.TYPE_COLORS[matchedType];
                const name = pokemon_types_1.TYPE_NAMES_ZH[matchedType];
                console.log(`[TypeBadge] Final Decision: Type=${matchedType}, Color=${color}, Name=${name}`);
                this.setData({
                    typeName: name,
                    bgColor: color
                });
            }
            else {
                console.warn('[TypeBadge] Fallback to default gray');
                this.setData({
                    typeName: newType,
                    bgColor: '#999999'
                });
            }
        }
    }
});
