import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  await prisma.pokemonCard.deleteMany();
  await prisma.pokemonCard.createMany({
    data: [
      { 
        id : 1,
        name:'Bulbizard',
        pokedexId: 1,
        typeId: 4,
        lifePoints : 50,
        size : 0.7,
        weight : 6.9,
        imageUrl:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"    
      },
      {
        id : 2,
        name:'Herbizarre',
        pokedexId: 2,
        typeId: 4,
        lifePoints : 60,
        size : 1.0,
        weight : 13.0,
        imageUrl:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png"
      },
      {
        id : 3,
        name:'Florizarre',
        pokedexId: 3,
        typeId: 4,
        lifePoints : 70,
        size : 2.0,
        weight : 100.0,
        imageUrl:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png"
      }
      
    ],
  });
  
  await prisma.user.create({
    data:  {
      email: "admin@gmail.com",
      password: "admin"
    } });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
