import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch tags from the database
      const tags = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      // Respond with the fetched tags
      res.status(200).json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ error: "Error fetching tags" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
}
