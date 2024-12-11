import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Reset database by deleting all records
  await prisma.$transaction([
    prisma.recipe.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.cookingMethod.deleteMany(),
  ]);
  console.log('Database reset completed.');

  // Seed Cooking Methods
  const cookingMethods = ['Frying', 'Grilling', 'Baking'];
  await Promise.all(
    cookingMethods.map((name) =>
      prisma.cookingMethod.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  console.log(`${cookingMethods.length} cooking methods upserted.`);

  // Seed Tags
  const tags = ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Spicy'];
  await Promise.all(
    tags.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  console.log(`${tags.length} tags upserted.`);

  // Seed Ingredients
  const ingredients = ['Tomato', 'Chicken', 'Flour', 'Cheese'];
  await prisma.ingredient.createMany({
    data: ingredients.map((name) => ({ name })),
  });
  console.log(`${ingredients.length} ingredients created.`);

  // Seed Recipes
  const recipes = [
    { name: 'Grilled Chicken', imageUrl: 'http://example.com/grilled-chicken.jpg' },
    { name: 'Vegetarian Pizza', imageUrl: 'http://example.com/vegetarian-pizza.jpg' },
  ];
  await prisma.recipe.createMany({
    data: recipes,
  });
  console.log(`${recipes.length} recipes created.`);

  // Link Recipes to Tags and Ingredients
  const grilledChicken = await prisma.recipe.findFirst({ where: { name: 'Grilled Chicken' } });
  const vegetarianPizza = await prisma.recipe.findFirst({ where: { name: 'Vegetarian Pizza' } });

  await prisma.recipe.update({
    where: { id: grilledChicken.id },
    data: {
      ingredients: { connect: [{ name: 'Chicken' }] },
      tags: { connect: [{ name: 'Gluten-Free' }, { name: 'Spicy' }] },
    },
  });

  await prisma.recipe.update({
    where: { id: vegetarianPizza.id },
    data: {
      ingredients: { connect: [{ name: 'Tomato' }, { name: 'Flour' }, { name: 'Cheese' }] },
      tags: { connect: [{ name: 'Vegetarian' }] },
    },
  });

  console.log('Relationships created for recipes.');
}

main()
  .then(() => {
    console.log('Seeding completed successfully.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    prisma.$disconnect();
    process.exit(1);
  });