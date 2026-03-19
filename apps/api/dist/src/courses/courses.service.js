"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.course.create({
            data: {
                name: data.name,
                description: data.description,
                isPublic: data.isPublic || false,
            }
        });
    }
    async findAll() {
        return this.prisma.course.findMany({
            include: {
                lessons: { select: { id: true, name: true, isPublic: true } },
                teachers: { select: { id: true, username: true, email: true } },
                students: { select: { id: true, username: true, email: true } },
            },
        });
    }
    async findPublicCourses() {
        return this.prisma.course.findMany({
            where: { isPublic: true },
            include: {
                lessons: {
                    select: { id: true, name: true, isPublic: true },
                    where: { isPublic: true }
                },
                teachers: { select: { id: true, username: true, email: true } },
            },
        });
    }
    async findMyCourses(role, userId) {
        const filter = role === 'ADMIN'
            ? {}
            : role === 'teacher'
                ? { teachers: { some: { id: userId } } }
                : { students: { some: { id: userId } } };
        return this.prisma.course.findMany({
            where: filter,
            include: {
                lessons: { select: { id: true, name: true } },
                teachers: { select: { id: true, username: true } },
                students: { select: { id: true } },
            },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                lessons: {
                    include: {
                        challenges: true,
                        tests: true,
                        exams: true,
                    },
                },
                teachers: { select: { id: true, username: true, email: true } },
                students: { select: { id: true, username: true } },
            },
        });
        if (!course)
            throw new common_1.NotFoundException(`Course #${id} not found`);
        return course;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.course.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.course.delete({ where: { id } });
    }
    async enrollStudent(courseId, studentId) {
        return this.prisma.course.update({
            where: { id: courseId },
            data: { students: { connect: { id: studentId } } },
        });
    }
    async removeStudent(courseId, studentId) {
        return this.prisma.course.update({
            where: { id: courseId },
            data: { students: { disconnect: { id: studentId } } },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map