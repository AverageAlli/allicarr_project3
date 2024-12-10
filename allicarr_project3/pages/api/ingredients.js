import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const ingredients = await prisma.ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      res.status(200).json(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      res.status(500).json({ error: "Error fetching ingredients" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}