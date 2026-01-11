import { MOCK_POKEMON_LIST } from '../../models/mock-data'
import { Pokemon } from '../../models/pokemon'

Component({
    properties: {
        id: String
    },

    data: {
        pokemon: null as Pokemon | null,
        isShiny: false,
        loading: true
    },

    methods: {
        onLoad(options: { id: string }) {
            const id = parseInt(options.id, 10)
            this.loadPokemon(id)
        },

        loadPokemon(id: number) {
            this.setData({ loading: true })

            // Simulate API fetch delay
            setTimeout(() => {
                const p = MOCK_POKEMON_LIST.find(item => item.id === id)
                if (p) {
                    this.setData({
                        pokemon: p,
                        loading: false
                    })

                    // Set nav bar title
                    wx.setNavigationBarTitle({
                        title: p.nameZh
                    })
                } else {
                    wx.showToast({ title: '未找到该宝可梦', icon: 'none' })
                    setTimeout(() => wx.navigateBack(), 1500)
                }
            }, 300)
        },

        toggleShiny() {
            this.setData({
                isShiny: !this.data.isShiny
            })
        }
    }
})
