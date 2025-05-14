import express from 'express';
import { Request, Response } from 'express';

import { pokemonCardRouter } from './pokemonCards/pokemonCards.router';
import { userRouter } from './user/user.router';


export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

app.use('/pokemons-cards', pokemonCardRouter);
app.use('/users', userRouter);


// app.get('/pokemons-cards/:pokemonCardId', (req: Request, res: Response) => {
//   const pokemonCardId = req.params.pokemonCardId;
//   res.status(200).send('Pokemon avec l\' id : ' +pokemonCardId );
// });

// app.post('/pokemons-cards', (_req: Request, _res: Response) => {
//   _res.status(200).send('post: Liste de tous les Pokémons');
// });

// app.patch('/pokemon-cards/:pokemonCardId', (_req: Request, _res: Response) => {
//   _res.status(200).send('post: Liste de tous les Pokémons avec id');
// });

// app.delete('/pokemon-cards/:pokemonCardId', (_req: Request, _res: Response) => {
//   _res.status(200).send('Liste de tous les Pokémons');
// });