import { PokemonType } from '../constants/pokemon-types'

export interface Pokemon {
    id: number
    nameZh: string
    nameEn: string
    types: PokemonType[]
    imageUrl: string
    imageShiny?: string // Optional for now
    desc?: string
    gen?: number
}
