"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_1 = require("../../services/pokemon");
Component({
    properties: {
        id: String
    },
    data: {
        pokemon: null,
        isShiny: false,
        loading: true
    },
    methods: {
        onLoad(options) {
            const id = parseInt(options.id, 10);
            this.loadPokemon(id);
        },
        loadPokemon(id) {
            this.setData({ loading: true });
            pokemon_1.pokemonService.getPokemonDetail(id)
                .then(res => {
                // Map API Response to Frontend Model
                // API returns snake_case, frontend uses camelCase
                const apiPokemon = res; // type assertion if needed
                const pokemon = {
                    id: apiPokemon.id,
                    nameZh: apiPokemon.name_zh,
                    nameEn: apiPokemon.name_en,
                    types: apiPokemon.types,
                    imageUrl: apiPokemon.image_normal,
                    imageShiny: apiPokemon.image_shiny,
                    desc: apiPokemon.desc,
                    gen: apiPokemon.gen
                };
                this.setData({
                    pokemon: pokemon,
                    loading: false
                });
                // Set nav bar title
                wx.setNavigationBarTitle({
                    title: pokemon.nameZh
                });
            })
                .catch(() => {
                wx.showToast({ title: '未找到该宝可梦', icon: 'none' });
                setTimeout(() => wx.navigateBack(), 1500);
            });
        },
        toggleShiny() {
            const newShinyState = !this.data.isShiny;
            this.setData({
                isShiny: newShinyState
            });
            // Haptic Feedback for V1.1
            if (newShinyState) {
                wx.vibrateShort({ type: 'light' });
            }
        }
    }
});
