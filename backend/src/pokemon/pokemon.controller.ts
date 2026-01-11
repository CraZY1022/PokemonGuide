import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { GetPokemonQueryDto } from './dto/get-pokemon-query.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  findAll(@Query() query: GetPokemonQueryDto) {
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pokemon = await this.pokemonService.findOne(+id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${id} not found`);
    }
    return pokemon;
  }
}
