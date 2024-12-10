import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create or upsert Cooking Methods
  const cookingMethods = ['Frying', 'Grilling', 'Baking'];
  for (const name of cookingMethods) {
    await prisma.cookingMethod.upsert({
      where: { name },
      update: {}, // No update needed, you can leave this empty
      create: { name },
    });
  }
  console.log(`${cookingMethods.length} cooking methods upserted.`);

  // Create or upsert Tags
  const tags = ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Spicy'];
  for (const name of tags) {
    await prisma.tag.upsert({
      where: { name },
      update: {}, // No update needed, you can leave this empty
      create: { name },
    });
  }
  console.log(`${tags.length} tags upserted.`);

  // Create Ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: 'Tomato' },
      { name: 'Chicken' },
      { name: 'Flour' },
      { name: 'Cheese' },
    ],
  });
  console.log(`${ingredients.count} ingredients created.`);

  // Create Recipes
  const recipes = await prisma.recipe.createMany({
    data: [
      { name: 'Grilled Chicken', imageUrl: 'http://example.com/grilled-chicken.jpg' },
      { name: 'Vegetarian Pizza', imageUrl: 'http://example.com/vegetarian-pizza.jpg' },
    ],
  });
  console.log(`${recipes.count} recipes created.`);

  // Create Relations (Link Tags and Ingredients to Recipes)
  const recipe1 = await prisma.recipe.update({
    where: { name: 'Grilled Chicken' },
    data: {
      ingredients: {
        connect: [
          { id: 2 }, // Chicken
        ],
      },
      tags: {
        connect: [
          { name: 'Gluten-Free' },
          { name: 'Spicy' },
        ],
      },
    },
  });

  const recipe2 = await prisma.recipe.update({
    where: { name: 'Vegetarian Pizza' },
    data: {
      ingredients: {
        connect: [
          { id: 1 }, // Tomato
          { id: 3 }, // Flour
          { id: 4 }, // Cheese
        ],
      },
      tags: {
        connect: [
          { name: 'Vegetarian' },
        ],
      },
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
