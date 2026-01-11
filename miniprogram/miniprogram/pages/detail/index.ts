import { pokemonService } from '../../services/pokemon'
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

            pokemonService.getPokemonDetail(id)
                .then(res => {
                    // Map API Response to Frontend Model
                    // API returns snake_case, frontend uses camelCase
                    const apiPokemon = res as any // type assertion if needed
                    const pokemon: Pokemon = {
                        id: apiPokemon.id,
                        nameZh: apiPokemon.name_zh,
                        nameEn: apiPokemon.name_en,
                        types: apiPokemon.types,
                        imageUrl: apiPokemon.image_normal,
                        imageShiny: apiPokemon.image_shiny,
                        desc: apiPokemon.desc,
                        gen: apiPokemon.gen
                    }

                    this.setData({
                        pokemon: pokemon,
                        loading: false
                    })

                    // Set nav bar title
                    wx.setNavigationBarTitle({
                        title: pokemon.nameZh
                    })
                })
                .catch(() => {
                    wx.showToast({ title: '未找到该宝可梦', icon: 'none' })
                    setTimeout(() => wx.navigateBack(), 1500)
                })
        },

        toggleShiny() {
            this.setData({
                isShiny: !this.data.isShiny
            })
        }
    }
})
