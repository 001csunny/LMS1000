"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
        console.log('Database already seeded, skipping.');
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('Admin@1234', salt);
    const userPasswordHash = await bcrypt.hash('User@1234', salt);
    const users = await prisma.user.createManyAndReturn({
        data: [
            { email: 'admin1@lms.local', username: 'Admin One', password: adminPasswordHash, role: client_1.Role.ADMIN },
            { email: 'user1@lms.local', username: 'Student Thai', password: userPasswordHash, role: client_1.Role.STUDENT },
        ],
    });
    const student = users.find(u => u.role === client_1.Role.STUDENT);
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
            { lessonId: c1l1.id, vocabularyId: c1v1.id, type: 'TRANSLATION', question: 'แปล: Hello', answer: 'สวัสดี', choices: ['สวัสดี', 'ขอบคุณ', 'ลาก่อน'] },
            { lessonId: c1l1.id, vocabularyId: c1v2.id, type: 'LISTENING', question: 'ฟังเสียงและเลือกคำให้ถูกต้อง', answer: 'ขอบคุณ', choices: ['สวัสดี', 'ขอบคุณ', 'ลาก่อน'] },
            { lessonId: c1l1.id, vocabularyId: c1v3.id, type: 'SPEAKING', question: 'พูดคำว่า: ลาก่อน', answer: 'ลาก่อน' },
        ],
    });
    const c2 = await prisma.course.create({
        data: { name: 'Travel Thai', description: 'Navigate Thailand efficiently like a pro.', isPublic: true },
    });
    const c2l1 = await prisma.lesson.create({
        data: { name: 'Airport & Taxi', description: 'From arrivals to your hotel.', courseId: c2.id, isPublic: true },
    });
    const c2v1 = await prisma.vocabulary.create({ data: { lessonId: c2l1.id, thaiWord: 'สนามบิน', englishWord: 'Airport' } });
    const c2v2 = await prisma.vocabulary.create({ data: { lessonId: c2l1.id, thaiWord: 'ไปส่งที่...', englishWord: 'Take me to...' } });
    await prisma.exercise.createMany({
        data: [
            { lessonId: c2l1.id, vocabularyId: c2v1.id, type: 'TRANSLATION', question: 'แปล: Airport', answer: 'สนามบิน', choices: ['สนามบิน', 'โรงแรม', 'สถานีรถไฟ'] },
            { lessonId: c2l1.id, vocabularyId: c2v2.id, type: 'SPEAKING', question: 'พูดคำว่า: ไปส่งที่...', answer: 'ไปส่งที่' },
        ],
    });
    const c2l2 = await prisma.lesson.create({
        data: { name: 'Street Food Ordering', description: 'Order delicious Thai food anywhere.', courseId: c2.id, isPublic: true },
    });
    const c2v3 = await prisma.vocabulary.create({ data: { lessonId: c2l2.id, thaiWord: 'หิวข้าวมั้ย', englishWord: 'Are you hungry?' } });
    const c2v4 = await prisma.vocabulary.create({ data: { lessonId: c2l2.id, thaiWord: 'ไม่เผ็ด', englishWord: 'Not spicy' } });
    await prisma.exercise.createMany({
        data: [
            { lessonId: c2l2.id, vocabularyId: c2v3.id, type: 'LISTENING', question: 'ฟังเสียงและเลือกคำให้ถูกต้อง', answer: 'หิวข้าวมั้ย', choices: ['หิวข้าวมั้ย', 'กินข้าวหรือยัง', 'อิ่มแล้ว'] },
            { lessonId: c2l2.id, vocabularyId: c2v4.id, type: 'SPEAKING', question: 'พูดคำว่า: ไม่เผ็ด', answer: 'ไม่เผ็ด' },
        ],
    });
    const c3 = await prisma.course.create({
        data: { name: 'Business Thai', description: 'Professional Thai etiquette and corporate terms.', isPublic: true },
    });
    const c3l1 = await prisma.lesson.create({
        data: { name: 'Office Etiquette', description: 'Meetings and professional interactions.', courseId: c3.id, isPublic: true },
    });
    const c3v1 = await prisma.vocabulary.create({ data: { lessonId: c3l1.id, thaiWord: 'ยินดีที่ได้รู้จัก', englishWord: 'Pleased to meet you' } });
    const c3v2 = await prisma.vocabulary.create({ data: { lessonId: c3l1.id, thaiWord: 'นัดหมาย', englishWord: 'Appointment' } });
    await prisma.exercise.createMany({
        data: [
            { lessonId: c3l1.id, vocabularyId: c3v1.id, type: 'SPEAKING', question: 'พูดคำว่า: ยินดีที่ได้รู้จัก', answer: 'ยินดีที่ได้รู้จัก' },
            { lessonId: c3l1.id, vocabularyId: c3v2.id, type: 'TRANSLATION', question: 'แปล: Appointment', answer: 'นัดหมาย', choices: ['นัดหมาย', 'ประชุม', 'ทำงาน'] },
        ],
    });
    if (student) {
        await prisma.userProgress.createMany({
            data: [
                { userId: student.id, lessonId: c1l1.id, status: 'COMPLETED', xpEarned: 100, completionPercentage: 100, highestScore: 100 },
                { userId: student.id, lessonId: c2l1.id, status: 'IN_PROGRESS', xpEarned: 50, completionPercentage: 50, highestScore: 50 },
            ]
        });
    }
    console.log('Seeded diverse courses (Greetings, Travel, Business) with Mixed Exercises and User Progress.');
}
main()
    .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map