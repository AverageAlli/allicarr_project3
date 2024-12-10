import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRecipeInDatabase({ name, imageUrl, ingredients, tags, cookingMethod }) {
  // Log the incoming data to ensure it's valid
  console.log("createRecipeInDatabase data:", { name, imageUrl, ingredients, tags, cookingMethod });

  try {
    // Check if the necessary data exists before proceeding
    if (!name || !ingredients || !tags || !cookingMethod) {
      throw new Error("Missing required fields.");
    }

    // Ensure ingredients, tags, and cookingMethod are in the expected format
    console.log("Ingredients:", ingredients);
    console.log("Tags:", tags);
    console.log("Cooking Method:", cookingMethod);

    // Proceed with creating the recipe in the database
    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        imageUrl,
        cookingMethod: {
          connect: { id: cookingMethod },  // Connect the cooking method to the recipe
        },
        ingredients: {
          connect: ingredients.map(id => ({ id })),  // Connect ingredients to the recipe
        },
        tags: {
          connect: tags.map(id => ({ id })),  // Connect tags to the recipe
        },
      },
      include: {
        ingredients: true,
        tags: true,
        cookingMethod: true,
      },
    });

    // Return the newly created recipe
    return newRecipe;
  } catch (error) {
    console.error("Error in createRecipeInDatabase:", error); // Log any error that occurs
    throw new Error("Database error while creating recipe.");
  }
}

