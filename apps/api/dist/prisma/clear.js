"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Clearing database...');
    try {
        await prisma.userProgress.deleteMany();
        await prisma.exercise.deleteMany();
        await prisma.vocabulary.deleteMany();
        await prisma.lesson.deleteMany();
        await prisma.course.deleteMany();
        await prisma.user.deleteMany();
        console.log('Database cleared successfully.');
    }
    catch (error) {
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
//# sourceMappingURL=clear.js.map