const BASE_URL = 'http://localhost:3000'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
    url: string
    method?: RequestMethod
    data?: any
    headers?: Record<string, string>
}

// 统一响应结构 (参考 NestJS)
interface ApiResponse<T = any> {
    statusCode?: number
    message?: string
    error?: string
    data?: T // 有些接口直接返回 data，有些包了一层 .data，需灵活处理
    [key: string]: any
}

export const request = <T = any>(options: RequestOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
        const token = wx.getStorageSync('token')

        const header: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers
        }

        if (token) {
            header['Authorization'] = `Bearer ${token}`
        }

        wx.request({
            url: `${BASE_URL}${options.url}`,
            method: options.method || 'GET',
            data: options.data,
            header,
            success: (res) => {
                const statusCode = res.statusCode
                const data = res.data as ApiResponse<T>

                if (statusCode >= 200 && statusCode < 300) {
                    // Success
                    resolve(data as unknown as T)
                } else {
                    // Error
                    const msg = data.message || `请求失败 ${statusCode}`
                    wx.showToast({
                        title: Array.isArray(msg) ? msg[0] : msg, // NestJS ValidationPipe returns array for messages
                        icon: 'none'
                    })

                    if (statusCode === 401) {
                        // Token expired
                        wx.removeStorageSync('token')
                        wx.removeStorageSync('userInfo')
                        // Optional: Redirect to login
                        // wx.navigateTo({ url: '/pages/auth/index' }) 
                    }

                    reject(data)
                }
            },
            fail: (err) => {
                wx.showToast({ title: '网络连接失败', icon: 'none' })
                reject(err)
            }
        })
    })
}
