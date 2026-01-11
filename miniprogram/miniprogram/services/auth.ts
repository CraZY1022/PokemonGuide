import { request } from '../utils/request'

interface LoginDto {
    username: string
    password?: string // Optional for now if we use other methods
}

interface RegisterDto {
    username: string
    password?: string
}

interface AuthResponse {
    access_token: string
}

interface UserProfile {
    userId: number
    username: string
    avatarUrl?: string // Backend might not return this yet, we might fallback
}

export const authService = {
    login(data: LoginDto) {
        return request<AuthResponse>({
            url: '/auth/login',
            method: 'POST',
            data
        })
    },

    register(data: RegisterDto) {
        return request<AuthResponse>({
            url: '/auth/register',
            method: 'POST',
            data
        })
    },

    getProfile() {
        return request<UserProfile>({
            url: '/auth/profile',
            method: 'GET'
        })
    }
}
