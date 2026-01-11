"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonService = void 0;
const request_1 = require("../utils/request");
exports.pokemonService = {
    getPokemonList(params) {
        return (0, request_1.request)({
            url: '/pokemon',
            method: 'GET',
            data: params
        });
    },
    getPokemonDetail(id) {
        return (0, request_1.request)({
            url: `/pokemon/${id}`,
            method: 'GET'
        });
    }
};
