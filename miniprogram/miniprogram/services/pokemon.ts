import { request } from '../utils/request'
import { Pokemon } from '../models/pokemon'

export interface GetPokemonListParams {
    page?: number
    limit?: number
    search?: string
    gen?: number
    type?: string
}

export interface PokemonListResponse {
    data: any[] // Component needs transformation
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

// API Response Types matching Backend
interface ApiPokemon {
    id: number
    name_zh: string
    name_en: string
    gen: number
    types: string[]
    image_normal: string
    image_shiny?: string
    desc?: string
}

export const pokemonService = {
    getPokemonList(params: GetPokemonListParams) {
        return request<PokemonListResponse>({
            url: '/pokemon',
            method: 'GET',
            data: params
        })
    },

    getPokemonDetail(id: number) {
        return request<ApiPokemon>({
            url: `/pokemon/${id}`,
            method: 'GET'
        })
    }
}
