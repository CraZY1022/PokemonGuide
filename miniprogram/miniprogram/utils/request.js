"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const BASE_URL = 'http://localhost:3000';
const request = (options) => {
    return new Promise((resolve, reject) => {
        const token = wx.getStorageSync('token');
        const header = Object.assign({ 'Content-Type': 'application/json' }, options.headers);
        if (token) {
            header['Authorization'] = `Bearer ${token}`;
        }
        wx.request({
            url: `${BASE_URL}${options.url}`,
            method: options.method || 'GET',
            data: options.data,
            header,
            success: (res) => {
                const statusCode = res.statusCode;
                const data = res.data;
                if (statusCode >= 200 && statusCode < 300) {
                    // Success
                    resolve(data);
                }
                else {
                    // Error
                    const msg = data.message || `请求失败 ${statusCode}`;
                    wx.showToast({
                        title: Array.isArray(msg) ? msg[0] : msg,
                        icon: 'none'
                    });
                    if (statusCode === 401) {
                        // Token expired
                        wx.removeStorageSync('token');
                        wx.removeStorageSync('userInfo');
                        // Optional: Redirect to login
                        // wx.navigateTo({ url: '/pages/auth/index' }) 
                    }
                    reject(data);
                }
            },
            fail: (err) => {
                wx.showToast({ title: '网络连接失败', icon: 'none' });
                reject(err);
            }
        });
    });
};
exports.request = request;
