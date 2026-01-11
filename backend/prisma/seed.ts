import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
// @ts-ignore
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding Pokemon data...');

    const POKEMON_COUNT = 1025;
    const BATCH_SIZE = 10;

    for (let i = 1; i <= POKEMON_COUNT; i += BATCH_SIZE) {
        const promises: Promise<void>[] = [];
        for (let j = 0; j < BATCH_SIZE && i + j <= POKEMON_COUNT; j++) {
            const id = i + j;
            promises.push(fetchAndSavePokemon(id));
        }

        await Promise.all(promises);
        console.log(`Processed up to #${Math.min(i + BATCH_SIZE - 1, POKEMON_COUNT)}`);
    }

    console.log('Seeding finished.');
}

async function fetchAndSavePokemon(id: number) {
    try {
        // 1. Fetch Basic Info (Types, Images)
        const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = pokemonRes.data;

        // 2. Fetch Species Info (Chinese Name, Gen)
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = speciesRes.data;

        // Extract Data
        const nameZhObj = speciesData.names.find((n: any) => n.language.name === 'zh-Hans');
        const nameZh = nameZhObj ? nameZhObj.name : data.name; // Fallback to English name
        const nameEn = data.name;

        // Simple Gen mapping roughly based on ID ranges or generation url, 
        // but speciesData.generation.url is safer: "url": "https://pokeapi.co/api/v2/generation/1/"
        const genUrl = speciesData.generation.url;
        const gen = parseInt(genUrl.split('/').filter(Boolean).pop() || '1');

        const types = data.types.map((t: any) => t.type.name);
        // PokeAPI Types: normal, fire, water... (lowercase)

        const imageNormal = data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default;
        const imageShiny = data.sprites.other?.['official-artwork']?.front_shiny || data.sprites.front_shiny;

        // Upsert to DB
        await prisma.pokemon.upsert({
            where: { id: id },
            update: {
                name_zh: nameZh,
                name_en: nameEn,
                gen: gen,
                types: types,
                image_normal: imageNormal,
                image_shiny: imageShiny,
            },
            create: {
                id: id,
                name_zh: nameZh,
                name_en: nameEn,
                gen: gen,
                types: types,
                image_normal: imageNormal,
                image_shiny: imageShiny,
            },
        });

    } catch (error) {
        console.error(`Error fetching/saving Pokemon #${id}:`, error.message);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
