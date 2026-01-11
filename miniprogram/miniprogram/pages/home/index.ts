import { pokemonService } from '../../services/pokemon'
import { Pokemon } from '../../models/pokemon'

Component({
    data: {
        pokemonList: [] as Pokemon[],
        loading: false,
        query: '',
        page: 1,
        hasMore: true,
        refresherTriggered: false
    },

    methods: {
        onLoad() {
            this.loadData()
        },

        loadData(loadMore: boolean = false) {
            console.log(`[Home] loadData called. loadMore=${loadMore}, hasMore=${this.data.hasMore}, loading=${this.data.loading}`)
            if (this.data.loading) return
            if (loadMore && !this.data.hasMore) return

            this.setData({ loading: true })

            const page = loadMore ? this.data.page + 1 : 1
            const { query } = this.data

            const params: any = {
                page: page,
                limit: 20
            }
            if (query) {
                params.search = query
            }

            pokemonService.getPokemonList(params)
                .then(res => {
                    const newList = res.data.map((item: any) => ({
                        id: item.id,
                        nameZh: item.name_zh,
                        nameEn: item.name_en,
                        types: item.types,
                        imageUrl: item.image_normal,
                        gen: item.gen
                    }))

                    const { meta } = res
                    console.log('[Home] API Response Meta:', meta)
                    const hasMore = meta.page < meta.totalPages

                    this.setData({
                        pokemonList: loadMore ? this.data.pokemonList.concat(newList) : newList,
                        loading: false,
                        page: page,
                        hasMore: hasMore,
                        refresherTriggered: false // Stop refresher animation
                    })
                })
                .catch(err => {
                    console.error('[Home] Load failed', err)
                    this.setData({
                        loading: false,
                        refresherTriggered: false
                    })
                })
        },

        onSearch(e: any) {
            this.setData({ query: e.detail }, () => {
                this.loadData(false)
            })
        },

        // Handlers for scroll-view
        onRefresherRefresh() {
            console.log('[Home] onRefresherRefresh')
            this.setData({ refresherTriggered: true })
            this.loadData(false)
        },

        onScrollToLower() {
            console.log('[Home] onScrollToLower')
            this.loadData(true)
        },

        // Legacy handlers (can remove/keep empty)
        onPullDownRefresh() { },
        onReachBottom() { },

        onInput(e: any) {
            // Optional: Real-time search or just update query
        },

        onFilter() {
            wx.showToast({ title: '筛选功能开发中', icon: 'none' })
        }
    }
})
