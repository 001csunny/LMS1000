"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function createMockupData() {
    console.log('🌱 Creating comprehensive mockup data...');
    await prisma.speechResult.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.vocabulary.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('Admin@1234', salt);
    const userPasswordHash = await bcrypt.hash('User@1234', salt);
    const admin1 = await prisma.user.create({
        data: {
            email: 'admin1@lms.local',
            username: 'Admin One',
            password: adminPasswordHash,
            role: client_1.Role.ADMIN,
            xp: 1000,
            streak: 5,
        },
    });
    const admin2 = await prisma.user.create({
        data: {
            email: 'admin2@lms.local',
            username: 'Admin Two',
            password: adminPasswordHash,
            role: client_1.Role.ADMIN,
            xp: 800,
            streak: 3,
        },
    });
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@lms.local',
            username: 'Student One',
            password: userPasswordHash,
            role: client_1.Role.STUDENT,
            xp: 500,
            streak: 7,
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'user2@lms.local',
            username: 'Student Two',
            password: userPasswordHash,
            role: client_1.Role.STUDENT,
            xp: 300,
            streak: 2,
        },
    });
    console.log('✅ Users created');
    const course1 = await prisma.course.create({
        data: {
            name: 'Basic English Conversation',
            description: 'Learn everyday English conversations for beginners',
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const course2 = await prisma.course.create({
        data: {
            name: 'Thai for Beginners',
            description: 'Essential Thai language for travelers and beginners',
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const course3 = await prisma.course.create({
        data: {
            name: 'Business English',
            description: 'Professional English for business communication',
            isPublic: false,
            difficulty: client_1.Difficulty.ADVANCED,
        },
    });
    console.log('✅ Courses created');
    const lesson1 = await prisma.lesson.create({
        data: {
            name: 'Lesson 1: Greetings & Introductions',
            description: 'Learn how to greet people and introduce yourself',
            courseId: course1.id,
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
            orderIndex: 1,
        },
    });
    const lesson2 = await prisma.lesson.create({
        data: {
            name: 'Lesson 2: Numbers & Time',
            description: 'Learn numbers, dates, and telling time',
            courseId: course1.id,
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
            orderIndex: 2,
        },
    });
    const lesson3 = await prisma.lesson.create({
        data: {
            name: 'Lesson 3: Family & Friends',
            description: 'Vocabulary for talking about family and relationships',
            courseId: course1.id,
            isPublic: true,
            difficulty: client_1.Difficulty.INTERMEDIATE,
            orderIndex: 3,
        },
    });
    const lesson4 = await prisma.lesson.create({
        data: {
            name: 'บทเรียน 1: สวัสดีและทักทาย',
            description: 'เรียนรู้วิธีการทักทายและแนะนำตัวในภาษาไทย',
            courseId: course2.id,
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
            orderIndex: 1,
        },
    });
    const lesson5 = await prisma.lesson.create({
        data: {
            name: 'บทเรียน 2: ตัวเลขและเวลา',
            description: 'เรียนรู้ตัวเลข วันที่ และการบอกเวลาภาษาไทย',
            courseId: course2.id,
            isPublic: true,
            difficulty: client_1.Difficulty.BEGINNER,
            orderIndex: 2,
        },
    });
    console.log('✅ Lessons created');
    const vocab1 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson1.id,
            thaiWord: 'สวัสดี',
            englishWord: 'Hello',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const vocab2 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson1.id,
            thaiWord: 'ขอบคุณ',
            englishWord: 'Thank you',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const vocab3 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson1.id,
            thaiWord: 'ยินดีที่ได้รู้จัก',
            englishWord: 'Nice to meet you',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const vocab4 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson4.id,
            thaiWord: 'สวัสดีครับ',
            englishWord: 'Hello (male)',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const vocab5 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson4.id,
            thaiWord: 'สวัสดีค่ะ',
            englishWord: 'Hello (female)',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    const vocab6 = await prisma.vocabulary.create({
        data: {
            lessonId: lesson4.id,
            thaiWord: 'สบายดีไหม',
            englishWord: 'How are you?',
            difficulty: client_1.Difficulty.BEGINNER,
        },
    });
    console.log('✅ Vocabularies created');
    await prisma.exercise.createMany({
        data: [
            {
                lessonId: lesson1.id,
                vocabularyId: vocab1.id,
                type: client_1.ExerciseType.SPEAKING,
                question: 'พูดคำว่า Hello',
                answer: 'Hello',
                orderIndex: 1,
            },
            {
                lessonId: lesson1.id,
                vocabularyId: vocab1.id,
                type: client_1.ExerciseType.TRANSLATION,
                question: 'แปลคำว่า สวัสดี',
                answer: 'Hello',
                hints: ['Hello', 'Hi', 'Hey'],
                orderIndex: 2,
            },
            {
                lessonId: lesson1.id,
                vocabularyId: vocab2.id,
                type: client_1.ExerciseType.SPEAKING,
                question: 'พูดคำว่า Thank you',
                answer: 'Thank you',
                orderIndex: 3,
            },
            {
                lessonId: lesson1.id,
                vocabularyId: vocab2.id,
                type: client_1.ExerciseType.LISTENING,
                question: 'ฟังและเลือกคำที่ถูกต้อง: Thank you',
                answer: 'Thank you',
                audioUrl: '/audio/thank-you.mp3',
                orderIndex: 4,
            },
            {
                lessonId: lesson1.id,
                vocabularyId: vocab3.id,
                type: client_1.ExerciseType.TRANSLATION,
                question: 'แปลคำว่า ยินดีที่ได้รู้จัก',
                answer: 'Nice to meet you',
                hints: ['Nice to meet you', 'Glad to meet you', 'Pleased to meet you'],
                orderIndex: 5,
            },
            {
                lessonId: lesson1.id,
                vocabularyId: vocab3.id,
                type: client_1.ExerciseType.MATCHING,
                question: 'จับคู่คำศัพท์: Nice to meet you',
                answer: 'Nice to meet you',
                orderIndex: 6,
            },
        ],
    });
    await prisma.exercise.createMany({
        data: [
            {
                lessonId: lesson4.id,
                vocabularyId: vocab4.id,
                type: client_1.ExerciseType.SPEAKING,
                question: 'พูดคำว่า สวัสดีครับ',
                answer: 'สวัสดีครับ',
                orderIndex: 1,
            },
            {
                lessonId: lesson4.id,
                vocabularyId: vocab5.id,
                type: client_1.ExerciseType.SPEAKING,
                question: 'พูดคำว่า สวัสดีค่ะ',
                answer: 'สวัสดีค่ะ',
                orderIndex: 2,
            },
            {
                lessonId: lesson4.id,
                vocabularyId: vocab6.id,
                type: client_1.ExerciseType.LISTENING,
                question: 'ฟังและตอบคำถาม: สบายดีไหม',
                answer: 'สบายดี',
                audioUrl: '/audio/how-are-you.mp3',
                orderIndex: 3,
            },
            {
                lessonId: lesson4.id,
                vocabularyId: vocab4.id,
                type: client_1.ExerciseType.TRANSLATION,
                question: 'แปลคำว่า Hello (male)',
                answer: 'สวัสดีครับ',
                hints: ['สวัสดีครับ', 'สวัสดี', 'Hello'],
                orderIndex: 4,
            },
        ],
    });
    console.log('✅ Exercises created');
    await prisma.userProgress.createMany({
        data: [
            {
                userId: user1.id,
                lessonId: lesson1.id,
                status: 'COMPLETED',
                xpEarned: 50,
                completionPercentage: 100,
                highestScore: 100,
            },
            {
                userId: user1.id,
                lessonId: lesson2.id,
                status: 'IN_PROGRESS',
                xpEarned: 20,
                completionPercentage: 30,
                highestScore: 0,
            },
            {
                userId: user2.id,
                lessonId: lesson4.id,
                status: 'COMPLETED',
                xpEarned: 40,
                completionPercentage: 100,
                highestScore: 100,
            },
        ],
    });
    console.log('✅ Progress data created');
    const exercises = await prisma.exercise.findMany({
        where: { type: client_1.ExerciseType.SPEAKING },
        take: 3,
    });
    if (exercises.length >= 3) {
        await prisma.speechResult.createMany({
            data: [
                {
                    userId: user1.id,
                    exerciseId: exercises[0].id,
                    audioUrl: '/audio/user1-hello.mp3',
                    transcript: 'Hello',
                    score: 85.5,
                    accuracy: 0.88,
                    passed: true,
                },
                {
                    userId: user1.id,
                    exerciseId: exercises[1].id,
                    audioUrl: '/audio/user1-thank-you.mp3',
                    transcript: 'Thank you',
                    score: 92.0,
                    accuracy: 0.95,
                    passed: true,
                },
                {
                    userId: user2.id,
                    exerciseId: exercises[2].id,
                    audioUrl: '/audio/user2-sawasdee.mp3',
                    transcript: 'สวัสดีครับ',
                    score: 78.0,
                    accuracy: 0.82,
                    passed: true,
                },
            ],
        });
    }
    console.log('✅ Speech results created');
    await prisma.subscription.createMany({
        data: [
            {
                userId: user1.id,
                plan: 'free',
                expiresAt: new Date('2026-12-31'),
            },
            {
                userId: user2.id,
                plan: 'premium',
                expiresAt: new Date('2026-12-31'),
            },
        ],
    });
    console.log('✅ Subscriptions created');
    console.log('🎉 Mockup data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: 4 (2 Admin, 2 User)`);
    console.log(`- Courses: 3 (2 Public, 1 Private)`);
    console.log(`- Lessons: 5`);
    console.log(`- Vocabularies: 6`);
    console.log(`- Exercises: 10`);
    console.log(`- Progress records: 3`);
    console.log(`- Speech results: 3`);
    console.log(`- Subscriptions: 2`);
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin1@lms.local / Admin@1234');
    console.log('Admin: admin2@lms.local / Admin@1234');
    console.log('User:  user1@lms.local / User@1234');
    console.log('User:  user2@lms.local / User@1234');
}
createMockupData()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=mockup-data.js.map