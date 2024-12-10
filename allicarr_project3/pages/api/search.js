import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { name, tags, ingredients } = req.query;
  
    try {
      // Prepare filters
      const where = {};
  
      if (name) {
        where.name = {
          contains: name,
          // Use `toLowerCase` to handle case insensitivity manually
          // Prisma uses the default case-sensitive behavior unless we add this logic
        };
      }
  
      if (tags) {
        where.tags = {
          some: {
            name: {
              contains: tags, // Search for tags that contain the given string
            },
          },
        };
      }
  
      if (ingredients) {
        where.ingredients = {
          some: {
            name: {
              contains: ingredients, // Search for ingredients that contain the given string
            },
          },
        };
      }
  
      // Fetch the filtered recipes from the database
      const recipes = await prisma.recipe.findMany({
        where,
        include: { tags: true, ingredients: true }, // Fetch related tags and ingredients
      });
  
      // Return the results
      res.status(200).json({ recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Error searching for recipes' });
    }
  }