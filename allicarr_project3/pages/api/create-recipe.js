import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Received Payload:", req.body);

      const { name, imageUrl, ingredients, tags, cookingMethod } = req.body;

      if (!name || !ingredients || !tags || !cookingMethod) {
        throw new Error("Missing required fields");
      }

      // Convert string IDs to integers
      const ingredientIds = ingredients.map(id => parseInt(id, 10));
      const tagIds = tags.map(id => parseInt(id, 10));
      const cookingMethodId = parseInt(cookingMethod, 10);

      // Proceed with the recipe creation logic
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          imageUrl: imageUrl || null,
          ingredients: {
            connect: ingredientIds.map(id => ({ id }))
          },
          tags: {
            connect: tagIds.map(id => ({ id }))
          },
          cookingMethod: {
            connect: {
              id: cookingMethodId,
            }
          },
        },
      });

      res.status(200).json({ success: true, recipe: newRecipe });
    } catch (error) {
      console.error("Error in create-recipe API:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}