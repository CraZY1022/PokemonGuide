import { PokemonType, TYPE_COLORS, TYPE_NAMES_ZH } from '../../constants/pokemon-types'

Component({
    properties: {
        type: {
            type: String,
            observer: 'updateStyle'
        },
        size: {
            type: String, // 'small' | 'medium'
            value: 'small'
        }
    },

    data: {
        typeName: '',
        bgColor: ''
    },

    methods: {
        updateStyle(newType: PokemonType) {
            if (!newType) return
            this.setData({
                typeName: TYPE_NAMES_ZH[newType] || newType,
                bgColor: TYPE_COLORS[newType] || '#999'
            })
        }
    }
})
