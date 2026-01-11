import { MOCK_POKEMON_LIST } from '../../models/mock-data'
import { Pokemon } from '../../models/pokemon'

Component({
    data: {
        pokemonList: [] as Pokemon[],
        loading: false,
        query: ''
    },

    methods: {
        onLoad() {
            this.loadData()
        },

        loadData() {
            this.setData({ loading: true })

            // Simulate API delay
            setTimeout(() => {
                // Simple client-side filtering logic for mock
                let list = MOCK_POKEMON_LIST
                if (this.data.query) {
                    const q = this.data.query.toLowerCase()
                    list = list.filter(p =>
                        p.nameZh.includes(q) ||
                        p.nameEn.toLowerCase().includes(q) ||
                        p.id.toString().includes(q)
                    )
                }

                this.setData({
                    pokemonList: list,
                    loading: false
                })
                wx.stopPullDownRefresh()
            }, 500)
        },

        onSearch(e: any) {
            this.setData({ query: e.detail }, () => {
                this.loadData()
            })
        },

        onInput(e: any) {
            // Optional: Real-time search or just update query
            // For now, let's just trigger on 'search' (confirm) or we can debounce here.
            // The search-bar component triggers 'input' on typing.
        },

        onFilter() {
            wx.showToast({ title: '筛选功能开发中', icon: 'none' })
        },

        onPullDownRefresh() {
            this.loadData()
        }
    }
})
