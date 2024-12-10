import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, imageUrl, ingredients, tags, cookingMethod } = req.body;
    console.log('Request body:', req.body);

    // Validate input
    if (!name || !ingredients || !tags || !cookingMethod) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
      // Create a new recipe in the database
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          imageUrl: imageUrl || null,
          cookingMethod: {
            connect: { id: cookingMethod }, // Connect existing cooking method
          },
          ingredients: {
            connect: ingredients.map((id) => ({ id })), // Connect multiple ingredients
          },
          tags: {
            connect: tags.map((id) => ({ id })), // Connect multiple tags
          },
        },
      });

      // Respond with the created recipe
      res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(500).json({ success: false, error: 'Failed to create recipe' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
