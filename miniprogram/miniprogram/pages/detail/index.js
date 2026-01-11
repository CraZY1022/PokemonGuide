"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_data_1 = require("../../models/mock-data");
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
            // Simulate API fetch delay
            setTimeout(() => {
                const p = mock_data_1.MOCK_POKEMON_LIST.find(item => item.id === id);
                if (p) {
                    this.setData({
                        pokemon: p,
                        loading: false
                    });
                    // Set nav bar title
                    wx.setNavigationBarTitle({
                        title: p.nameZh
                    });
                }
                else {
                    wx.showToast({ title: '未找到该宝可梦', icon: 'none' });
                    setTimeout(() => wx.navigateBack(), 1500);
                }
            }, 300);
        },
        toggleShiny() {
            this.setData({
                isShiny: !this.data.isShiny
            });
        }
    }
});
