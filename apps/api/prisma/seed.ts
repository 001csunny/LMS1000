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

  // Users
  const users = await prisma.user.createManyAndReturn({
    data: [
      { email: 'admin1@lms.local', username: 'Admin One', password: adminPasswordHash, role: Role.ADMIN },
      { email: 'user1@lms.local', username: 'Student Thai', password: userPasswordHash, role: Role.STUDENT },
    ],
  });

  // Course 1: Basic Thai Greetings
  const c1 = await prisma.course.create({
    data: { name: 'Basic Thai Greetings', description: 'Essential phrases for meeting people.', isPublic: true },
  });

  const c1l1 = await prisma.lesson.create({
    data: { name: 'Saying Hello and Goodbye', description: 'Formal and informal greetings.', courseId: c1.id, isPublic: true },
  });
  
  const c1v1 = await prisma.vocabulary.create({ data: { lessonId: c1l1.id, thaiWord: 'สวัสดี', englishWord: 'Hello' } });
  const c1v2 = await prisma.vocabulary.create({ data: { lessonId: c1l1.id, thaiWord: 'ขอบคุณ', englishWord: 'Thank you' } });
  const c1v3 = await prisma.vocabulary.create({ data: { lessonId: c1l1.id, thaiWord: 'ลาก่อน', englishWord: 'Goodbye' } });

  await prisma.exercise.createMany({
    data: [
      { lessonId: c1l1.id, vocabularyId: c1v1.id, type: 'SPEAKING', question: 'พูดคำว่า: สวัสดี', answer: 'สวัสดี' },
      { lessonId: c1l1.id, vocabularyId: c1v1.id, type: 'TRANSLATION', question: 'แปล: Hello', answer: 'สวัสดี' },
      { lessonId: c1l1.id, vocabularyId: c1v2.id, type: 'LISTENING', question: 'ฟังเสียงและพิมพ์คำให้ถูกต้อง', answer: 'ขอบคุณ' },
      { lessonId: c1l1.id, vocabularyId: c1v3.id, type: 'SPEAKING', question: 'พูดคำว่า: ลาก่อน', answer: 'ลาก่อน' },
    ],
  });

  // Course 2: Travel & Navigation
  const c2 = await prisma.course.create({
    data: { name: 'Travel & Navigation', description: 'Navigate Thailand efficiently.', isPublic: true },
  });

  const c2l1 = await prisma.lesson.create({
    data: { name: 'Getting Around', description: 'Trains, taxis, and directions.', courseId: c2.id, isPublic: true },
  });

  const c2v1 = await prisma.vocabulary.create({ data: { lessonId: c2l1.id, thaiWord: 'สถานีรถไฟ', englishWord: 'Train Station' } });
  const c2v2 = await prisma.vocabulary.create({ data: { lessonId: c2l1.id, thaiWord: 'ถนน', englishWord: 'Road' } });
  const c2v3 = await prisma.vocabulary.create({ data: { lessonId: c2l1.id, thaiWord: 'เลี้ยวซ้าย', englishWord: 'Turn left' } });

  await prisma.exercise.createMany({
    data: [
      { lessonId: c2l1.id, vocabularyId: c2v1.id, type: 'TRANSLATION', question: 'แปล: Train Station', answer: 'สถานีรถไฟ' },
      { lessonId: c2l1.id, vocabularyId: c2v2.id, type: 'SPEAKING', question: 'พูดคำว่า: ถนน', answer: 'ถนน' },
      { lessonId: c2l1.id, vocabularyId: c2v3.id, type: 'LISTENING', question: 'ฟังเสียงและพิมพ์คำให้ถูกต้อง', answer: 'เลี้ยวซ้าย' },
    ],
  });

  // Course 3: Business Conversations
  const c3 = await prisma.course.create({
    data: { name: 'Business Conversations', description: 'Professional Thai etiquette.', isPublic: true },
  });

  const c3l1 = await prisma.lesson.create({
    data: { name: 'Office Vocabulary', description: 'Meetings and corporate terms.', courseId: c3.id, isPublic: true },
  });

  const c3v1 = await prisma.vocabulary.create({ data: { lessonId: c3l1.id, thaiWord: 'ประชุม', englishWord: 'Meeting' } });
  const c3v2 = await prisma.vocabulary.create({ data: { lessonId: c3l1.id, thaiWord: 'บริษัท', englishWord: 'Company' } });

  await prisma.exercise.createMany({
    data: [
      { lessonId: c3l1.id, vocabularyId: c3v1.id, type: 'SPEAKING', question: 'พูดคำว่า: ประชุม', answer: 'ประชุม' },
      { lessonId: c3l1.id, vocabularyId: c3v2.id, type: 'LISTENING', question: 'ฟังเสียงและพิมพ์คำให้ถูกต้อง', answer: 'บริษัท' },
    ],
  });

  console.log('Seeded 3 complete courses ("Basic Greetings", "Travel & Navigation", "Business Conversations") with dynamic exercises.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
