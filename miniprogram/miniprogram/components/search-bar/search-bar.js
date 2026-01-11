"use strict";
Component({
    properties: {
        placeholder: {
            type: String,
            value: '搜索宝可梦名称/编号'
        }
    },
    data: {
        value: '',
        isFocused: false
    },
    methods: {
        onInput(e) {
            this.setData({
                value: e.detail.value
            });
            this.triggerEvent('input', e.detail.value);
        },
        onFocus() {
            this.setData({ isFocused: true });
        },
        onBlur() {
            this.setData({ isFocused: false });
        },
        onClear() {
            this.setData({ value: '' });
            this.triggerEvent('input', '');
            this.triggerEvent('clear');
        },
        onConfig() {
            this.triggerEvent('search', this.data.value);
        },
        onFilterTap() {
            this.triggerEvent('filter');
        }
    }
});
