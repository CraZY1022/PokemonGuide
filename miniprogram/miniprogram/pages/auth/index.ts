import { authService } from '../../services/auth'

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

            const action = isRegister
                ? authService.register({ username, password })
                : authService.login({ username, password })

            action.then(res => {
                this.setData({ loading: false })

                if (isRegister) {
                    wx.showToast({ title: '注册成功', icon: 'success' })
                    // Auto login logic or just toggle to login? 
                    // Requirement says: "Response (201 Created): Register success auto login, return Token."
                    // So we treat it as login success
                    this.handleLoginSuccess(res.access_token, username)
                } else {
                    this.handleLoginSuccess(res.access_token, username)
                }
            }).catch(() => {
                this.setData({ loading: false })
            })
        },

        handleLoginSuccess(token: string, username: string) {
            wx.setStorageSync('token', token)
            // We don't have full user info yet, store partial or fetch profile
            // For better UX, let's fetch profile immediately or just store username
            // Fetch profile to get real userId
            authService.getProfile().then(userProfile => {
                wx.setStorageSync('userInfo', {
                    ...userProfile,
                    // Mock avatar for now as backend might not return it
                    avatarUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
                })
                wx.showToast({ title: '登录成功', icon: 'success' })
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
            }).catch(() => {
                // Fallback if profile fetch fails
                wx.setStorageSync('userInfo', { username, avatarUrl: '' })
                wx.navigateBack()
            })
        }
    }
})
