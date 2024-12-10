import { PrismaClient } from '@prisma/client';

let prisma;

// Ensure a single Prisma client instance in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
