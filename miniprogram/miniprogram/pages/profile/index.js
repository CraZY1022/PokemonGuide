"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../services/auth");
Component({
    data: {
        userInfo: null,
        isLoggedIn: false
    },
    methods: {
        onShow() {
            this.checkLoginStatus();
        },
        checkLoginStatus() {
            const token = wx.getStorageSync('token');
            const userInfo = wx.getStorageSync('userInfo');
            if (token && userInfo) {
                this.setData({
                    userInfo: userInfo,
                    isLoggedIn: true
                });
                // Silent refresh of profile
                auth_1.authService.getProfile().then(userProfile => {
                    const newUserInfo = Object.assign(Object.assign({}, userInfo), userProfile);
                    wx.setStorageSync('userInfo', newUserInfo);
                    this.setData({ userInfo: newUserInfo });
                }).catch(() => {
                    // Token likely expired
                    // request.ts handles 401 logout, but here we can just update UI
                    // this.setData({ isLoggedIn: false })
                });
            }
            else {
                this.setData({
                    userInfo: null,
                    isLoggedIn: false
                });
            }
        },
        onLoginTap() {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
        },
        onLogoutTap() {
            wx.showModal({
                title: '提示',
                content: '确定要退出登录吗？',
                success: (res) => {
                    if (res.confirm) {
                        wx.removeStorageSync('userInfo');
                        wx.removeStorageSync('token');
                        this.checkLoginStatus();
                        wx.showToast({ title: '已退出', icon: 'none' });
                    }
                }
            });
        }
    }
});
