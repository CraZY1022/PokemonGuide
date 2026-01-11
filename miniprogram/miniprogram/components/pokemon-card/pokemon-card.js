"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    properties: {
        data: Object
    },
    methods: {
        onTap() {
            const pokemon = this.data.data;
            if (pokemon && pokemon.id) {
                wx.navigateTo({
                    url: `/pages/detail/index?id=${pokemon.id}`
                });
            }
        }
    }
});
