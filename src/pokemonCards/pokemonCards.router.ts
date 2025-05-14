import { Router } from 'express';
import { createPokemonCards, getPokemonCards, getPokemonCardsById, updatePokemonCards, deletePokemonCards} from './pokemonCards.controller';
import { verifyJWT } from '../common/jwt.middleware';

export const pokemonCardRouter = Router();

pokemonCardRouter.get('/', getPokemonCards);

pokemonCardRouter.get('/:pokemonCardId', getPokemonCardsById);

pokemonCardRouter.post('/', verifyJWT, createPokemonCards);

pokemonCardRouter.patch('/:pokemonCardId', verifyJWT, updatePokemonCards);

pokemonCardRouter.delete('/:pokemonCardId', verifyJWT, deletePokemonCards);