import { Pokemon } from './pokemon'
import { PokemonType } from '../constants/pokemon-types'

export const MOCK_POKEMON_LIST: Pokemon[] = [
    {
        id: 1,
        nameZh: '妙蛙种子',
        nameEn: 'Bulbasaur',
        types: [PokemonType.Grass, PokemonType.Poison],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
        desc: '背上长有植物的种子。会随着身体的成长，种子也会逐渐长大。',
        gen: 1
    },
    {
        id: 4,
        nameZh: '小火龙',
        nameEn: 'Charmander',
        types: [PokemonType.Fire],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png',
        desc: '生下来的时候，尾巴上就有火在燃烧。当尾巴上的火熄灭时，它的生命就结束了。',
        gen: 1
    },
    {
        id: 7,
        nameZh: '杰尼龟',
        nameEn: 'Squirtle',
        types: [PokemonType.Water],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/7.png',
        desc: '甲壳的作用不仅仅是用来保护自己。它圆润的外形和表面的沟槽会减少水的阻力，使它能快速地游动。',
        gen: 1
    },
    {
        id: 25,
        nameZh: '皮卡丘',
        nameEn: 'Pikachu',
        types: [PokemonType.Electric],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png',
        desc: '越是能制造出强大电流的皮卡丘，脸颊上的囊就越柔软，同时也越有伸缩性。',
        gen: 1
    },
    {
        id: 132,
        nameZh: '百变怪',
        nameEn: 'Ditto',
        types: [PokemonType.Normal],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/132.png',
        desc: '此时此刻，正在进行这种重组。',
        gen: 1
    },
    {
        id: 149,
        nameZh: '快龙',
        nameEn: 'Dragonite',
        types: [PokemonType.Dragon, PokemonType.Flying],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/149.png',
        desc: '心地善良的宝可梦。如果在汪洋大海中发现溺水的人，它就会把人救出来并背到已看见陆地的地方。',
        gen: 1
    },
    {
        id: 151,
        nameZh: '梦幻',
        nameEn: 'Mew',
        types: [PokemonType.Psychic],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
        imageShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/151.png',
        desc: '据说因为它拥有所有宝可梦的基因，所以它能使用所有的招式。',
        gen: 1
    }
]
