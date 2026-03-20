import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  try {
    // Delete in reverse order of dependencies
    await prisma.userProgress.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.vocabulary.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();
    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

main()
  .catch((e) => {
    console.error('Clear script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
