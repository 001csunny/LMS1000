import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.user.count();

  // Only seed if the database is empty to allow re-runs safely
  if (userCount > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const adminPasswordHash = await bcrypt.hash('Admin@1234', salt);
  const userPasswordHash = await bcrypt.hash('User@1234', salt);

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin1@lms.local',
        username: 'Admin One',
        password: adminPasswordHash,
        role: Role.ADMIN,
        xp: 0,
        streak: 0,
      },
      {
        email: 'admin2@lms.local',
        username: 'Admin Two',
        password: adminPasswordHash,
        role: Role.ADMIN,
        xp: 0,
        streak: 0,
      },
      {
        email: 'user1@lms.local',
        username: 'Student One',
        password: userPasswordHash,
        role: Role.USER,
        xp: 350,
        streak: 3,
      },
      {
        email: 'user2@lms.local',
        username: 'Student Two',
        password: userPasswordHash,
        role: Role.USER,
        xp: 120,
        streak: 3,
      },
    ],
  });

  // Create courses (some public, some private)
  const publicCourse = await prisma.course.create({
    data: {
      name: 'Thai Basics - Public',
      description: 'A public course for anyone to learn Thai basics',
      isPublic: true,
    },
  });

  const privateCourse = await prisma.course.create({
    data: {
      name: 'Advanced Thai - Private',
      description: 'A private course for enrolled students only',
      isPublic: false,
    },
  });

  // Create lessons (some public, some private)
  await prisma.lesson.createMany({
    data: [
      {
        name: 'Thai Alphabet - Public',
        description: 'Learn the Thai alphabet',
        courseId: publicCourse.id,
        isPublic: true,
      },
      {
        name: 'Basic Greetings - Public',
        description: 'Learn basic Thai greetings',
        courseId: publicCourse.id,
        isPublic: true,
      },
      {
        name: 'Advanced Grammar - Private',
        description: 'Advanced Thai grammar lessons',
        courseId: privateCourse.id,
        isPublic: false,
      },
    ],
  });

  console.log('Seeded 2 admin users, 2 regular users, 2 courses, and 3 lessons.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
