import{ Request, Response } from 'express';
import prisma from '../client';

export const getPokemonCards = async (req: Request, res: Response) => {
    try {
        const pokemon=await prisma.pokemonCard.findMany();
        res.status(200).send(pokemon);
    } catch (error) {
        res.status(404).send("404 Not Found");
    }
}

export const getPokemonCardsById = async (req: Request, res: Response) => {
    try {
        const pokemonCardId = req.params.pokemonCardId;
        const pokemon=await prisma.pokemonCard.findUnique({where: { id: Number(pokemonCardId) }});
        res.status(200).send(pokemon);
    }
    catch (error) {
        res.status(404).send("PokemonCard not found");
    }
}


export const createPokemonCards = async (req: Request, res: Response) => {
    try{
        const {
            id : id, 
            name : name, 
            pokedexId : pokedexId, 
            typeId : typeId, 
            lifePoints : lifePoints, 
            size : size, 
            weight : weight, 
            imageUrl : imageUrl
        } = req.body;
        const pokemon=await prisma.pokemonCard.create({ data : {
            id,
            name,
            pokedexId,
            typeId,
            lifePoints,
            size,
            weight,
            imageUrl
        }});
        res.status(201).send("Pokemon créé");
    } catch (error) {
        const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl } = req.body;
        
        if (!name || !pokedexId || !typeId || !lifePoints || !size || !weight || !imageUrl) {
            res.status(400).send("champs manquants");
            return;
        }
        
        const existingPokemon = await prisma.pokemonCard.findFirst({
            where: { OR: [{ name }, { pokedexId }] }
        });
        
        if (existingPokemon) {
            res.status(400).send(" pokedexId ou name deja utilisé");
            return;
        }
        
        const typeExists = await prisma.type.findUnique({ where: { id: typeId } });
        if (!typeExists) {
            res.status(400).send("Type invalide");
            return;
        }
    }
};

export const updatePokemonCards = async (req: Request, res: Response) => {
    try {
        const pokemonCardId = req.params.pokemonCardId;
        const {
            id : id, 
            name : name, 
            pokedexId : pokedexId, 
            typeId : typeId, 
            lifePoints : lifePoints, 
            size : size, 
            weight : weight, 
            imageUrl : imageUrl
        } = req.body;
        const pokemon = await prisma.pokemonCard.update({
            where: { id: Number(pokemonCardId) },
            data: { name, pokedexId, typeId, lifePoints, size, weight, imageUrl }
        });
        res.status(200).send(pokemon);
    } catch (error) {
        const pokemonCardId = req.params.pokemonCardId;
        const {
            id : id, 
            name : name, 
            pokedexId : pokedexId, 
            typeId : typeId, 
            lifePoints : lifePoints, 
            size : size, 
            weight : weight, 
            imageUrl : imageUrl
        } = req.body;
        const existingPokemon = await prisma.pokemonCard.findUnique({ where: { id: Number(pokemonCardId) } });
        if (!existingPokemon) {
            res.status(404).send("404 Not found");
            return;
        }
        
        if (!name || !pokedexId || !typeId || !lifePoints || !size || !weight || !imageUrl) {
            res.status(400).send("Champs manquants");
            return;
        }
        
        const duplicatePokemon = await prisma.pokemonCard.findFirst({
            where: { OR: [{ name }, { pokedexId }], NOT: { id: Number(pokemonCardId) } }
        });
        
        if (duplicatePokemon) {
            res.status(400).send("podexeId ou name deja utilisé");
            return;
        }
        
        const typeExists = await prisma.type.findUnique({ where: { id: typeId } });
        if (!typeExists) {
            res.status(400).send("Type invalide");
            return;
        }
        
    }
};

export const deletePokemonCards = async (req: Request, res: Response) => {
    try {
        const pokemonCardId = req.params.pokemonCardId;
        const pokemon=await prisma.pokemonCard.delete({where: { id: Number(pokemonCardId) }});
        res.status(200).send("pokemon supprimé");
    } catch (error) {
        res.status(404).send("404 Not Found");
    }
}