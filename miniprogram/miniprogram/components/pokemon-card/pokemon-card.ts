import { Pokemon } from '../../models/pokemon'

Component({
    properties: {
        data: Object
    },

    methods: {
        onTap() {
            const pokemon = this.data.data as Pokemon
            if (pokemon && pokemon.id) {
                wx.navigateTo({
                    url: `/pages/detail/index?id=${pokemon.id}`
                })
            }
        }
    }
})
