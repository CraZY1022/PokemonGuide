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
            if (!newType)
                return;
            this.setData({
                typeName: pokemon_types_1.TYPE_NAMES_ZH[newType] || newType,
                bgColor: pokemon_types_1.TYPE_COLORS[newType] || '#999'
            });
        }
    }
});
