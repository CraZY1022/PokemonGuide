"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_data_1 = require("../../models/mock-data");
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
            // Simulate API delay
            setTimeout(() => {
                // Simple client-side filtering logic for mock
                let list = mock_data_1.MOCK_POKEMON_LIST;
                if (this.data.query) {
                    const q = this.data.query.toLowerCase();
                    list = list.filter(p => p.nameZh.includes(q) ||
                        p.nameEn.toLowerCase().includes(q) ||
                        p.id.toString().includes(q));
                }
                this.setData({
                    pokemonList: list,
                    loading: false
                });
                wx.stopPullDownRefresh();
            }, 500);
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
