"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_1 = require("../../services/pokemon");
Component({
    data: {
        pokemonList: [],
        loading: false,
        query: ''
    },
    methods: {
        onLoad() {
            this.loadData();
        },
        loadData() {
            this.setData({ loading: true });
            const { query } = this.data;
            const params = {};
            if (query) {
                params.search = query;
            }
            pokemon_1.pokemonService.getPokemonList(params)
                .then(res => {
                // Map API response to Frontend Model
                const list = res.data.map((item) => ({
                    id: item.id,
                    nameZh: item.name_zh,
                    nameEn: item.name_en,
                    types: item.types,
                    // Note: PokemonType enum values were not checked thoroughly, assuming backend returns compatible string lines "grass"
                    // If enum is capitalized, might need mapper. Let's check matching later.
                    imageUrl: item.image_normal,
                    gen: item.gen
                }));
                this.setData({
                    pokemonList: list,
                    loading: false
                });
                wx.stopPullDownRefresh();
            })
                .catch(() => {
                this.setData({ loading: false });
                wx.stopPullDownRefresh();
            });
        },
        onSearch(e) {
            this.setData({ query: e.detail }, () => {
                this.loadData();
            });
        },
        onInput(e) {
            // Optional: Real-time search or just update query
            // For now, let's just trigger on 'search' (confirm) or we can debounce here.
            // The search-bar component triggers 'input' on typing.
        },
        onFilter() {
            wx.showToast({ title: '筛选功能开发中', icon: 'none' });
        },
        onPullDownRefresh() {
            this.loadData();
        }
    }
});
