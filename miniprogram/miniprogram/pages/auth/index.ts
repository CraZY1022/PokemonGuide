Component({
    data: {
        isRegister: false, // false: Login, true: Register
        username: '',
        password: '',
        loading: false
    },

    methods: {
        toggleMode() {
            this.setData({
                isRegister: !this.data.isRegister,
                username: '',
                password: ''
            })
            wx.setNavigationBarTitle({
                title: this.data.isRegister ? '注册账号' : '登录'
            })
        },

        onInput(e: WechatMiniprogram.Input) {
            const field = e.currentTarget.dataset.field
            this.setData({
                [field]: e.detail.value
            })
        },

        onSubmit() {
            const { username, password, isRegister } = this.data

            if (!username || !password) {
                wx.showToast({ title: '请输入用户名和密码', icon: 'none' })
                return
            }

            this.setData({ loading: true })

            // Mock API Call
            setTimeout(() => {
                this.setData({ loading: false })

                if (isRegister) {
                    wx.showToast({ title: '注册成功，请登录', icon: 'success' })
                    this.toggleMode()
                } else {
                    // Mock Login Success
                    const userInfo = {
                        username,
                        avatarUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', // Pikachu avatar
                        userId: 1001
                    }

                    // Store Session
                    wx.setStorageSync('userInfo', userInfo)
                    wx.setStorageSync('token', 'mock-token-12345')

                    wx.showToast({ title: '登录成功', icon: 'success' })

                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                }
            }, 1000)
        }
    }
})
