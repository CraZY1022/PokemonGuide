import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetPokemonQueryDto } from './dto/get-pokemon-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) { }

  async findAll(query: GetPokemonQueryDto) {
    const { page = 1, limit = 20, search, gen, type } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: Prisma.PokemonWhereInput = {};

    if (gen) {
      where.gen = Number(gen);
    }

    if (type) {
      where.types = {
        has: type,
      };
    }

    if (search) {
      const searchNum = Number(search);
      // If search is a valid number, assume it's an ID search
      if (!isNaN(searchNum)) {
        where.id = searchNum;
      } else {
        // Otherwise search by name (Chinese OR English)
        where.OR = [
          { name_zh: { contains: search } },
          { name_en: { contains: search, mode: 'insensitive' } },
        ];
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.pokemon.findMany({
        skip,
        take,
        where,
        orderBy: { id: 'asc' },
      }),
      this.prisma.pokemon.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }
}
