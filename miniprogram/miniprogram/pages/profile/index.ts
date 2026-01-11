Component({
    data: {
        userInfo: null as any,
        isLoggedIn: false
    },

    methods: {
        onShow() {
            this.checkLoginStatus()
        },

        checkLoginStatus() {
            const userInfo = wx.getStorageSync('userInfo')
            if (userInfo) {
                this.setData({
                    userInfo: userInfo,
                    isLoggedIn: true
                })
            } else {
                this.setData({
                    userInfo: null,
                    isLoggedIn: false
                })
            }
        },

        onLoginTap() {
            wx.navigateTo({
                url: '/pages/auth/index'
            })
        },

        onLogoutTap() {
            wx.showModal({
                title: '提示',
                content: '确定要退出登录吗？',
                success: (res) => {
                    if (res.confirm) {
                        wx.removeStorageSync('userInfo')
                        wx.removeStorageSync('token')
                        this.checkLoginStatus()
                        wx.showToast({ title: '已退出', icon: 'none' })
                    }
                }
            })
        }
    }
})
