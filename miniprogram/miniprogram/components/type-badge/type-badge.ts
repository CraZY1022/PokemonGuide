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
        updateStyle(newType: string) {
            if (!newType) return

            // Create Reverse Map safely
            const reverseMap: Record<string, string> = {}
            const keys = Object.keys(TYPE_NAMES_ZH)
            keys.forEach(key => {
                const zhName = TYPE_NAMES_ZH[key as PokemonType]
                reverseMap[zhName] = key
            })
            // Console log reverse map only once or if needed (verbose)
            // console.log('[TypeBadge] Reverse Map:', reverseMap)

            let matchedType: PokemonType | null = null

            // 1. Try Direct English Match (Case Insensitive)
            const typeKey = newType.toLowerCase()
            const enumKey = typeKey.charAt(0).toUpperCase() + typeKey.slice(1)

            if (TYPE_COLORS[enumKey as PokemonType]) {
                matchedType = enumKey as PokemonType
            }
            // 2. Try Chinese Match
            else if (reverseMap[newType]) {
                matchedType = reverseMap[newType] as PokemonType
            } else {
                // No match found
            }

            if (matchedType) {
                const color = TYPE_COLORS[matchedType]
                const name = TYPE_NAMES_ZH[matchedType]

                this.setData({
                    typeName: name,
                    bgColor: color
                })
            } else {
                this.setData({
                    typeName: newType,
                    bgColor: '#999999'
                })
            }
        }
    }
})
