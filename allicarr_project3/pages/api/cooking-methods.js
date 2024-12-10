import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch data from Prisma
      const methods = await prisma.cookingMethod.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      // Send response
      res.status(200).json(methods);
    } catch (error) {
      console.error("Error fetching cooking methods:", error);
      res.status(500).json({ error: "Error fetching cooking methods" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
}