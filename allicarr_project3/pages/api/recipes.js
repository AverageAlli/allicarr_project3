import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all recipes
      const recipes = await prisma.recipe.findMany();

      // Check if there are any recipes
      if (recipes.length === 0) {
        return res.status(404).json({ success: false, error: 'No recipes found' });
      }

      // Send a structured JSON response with the recipes array
      res.status(200).json({ success: true, data: recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch recipes' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}