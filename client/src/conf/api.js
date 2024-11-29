import ax from "./ax";
import conf from "./main";

// *** Users ***
export const getCurrentUser = async () => {
    try {
        const user = await ax.get(conf.jwtUserEndpoint);
        return user.data;
    } catch (error) {
        console.error(error);
    }
};

// *** Courses ***
export const createCourse = async (coursename, description, teacherId) => {
    try {
        const course = await ax.post("/api/courses", {
            data: {
                name: coursename,
                description: description,
                teachers: [{ id: teacherId }],
            },
        });
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchCourse = async () => {
    try {
        const course = await ax.get("/api/courses?populate=*");
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchMyCourse = async (id) => {
    try {
        const course = await ax.get(
            `/api/courses?filters[teachers][id][$eq]=${id}&populate=*`
        );
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneCourse = async (id) => {
    try {
        const course = await ax.get(`/api/courses/${id}?populate=*`);
        return course.data;
    } catch (error) {
        console.error("Error fetching course:", error);
    }
};

export const updateCourse = async (id, data) => {
    try {
        const course = await ax.put(`/api/courses/${id}`, {
            data: data,
        });
        return course.data;
    } catch (error) {
        console.error("Error updating course:", error);
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await ax.delete(`/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error);
    }
};

// *** Lessons ***
export const createLesson = async (lessonname, description, courseId) => {
    try {
        const lesson = await ax.post("/api/lessons", {
            data: {
                name: lessonname,
                description: description,
                course: [{ id: courseId }],
            },
        });
        return lesson.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneLesson = async (id) => {
    try {
        const lesson = await ax.get(`/api/lessons/${id}?populate=*`);
        return lesson.data;
    } catch (error) {
        console.error("Error fetching lesson:", error);
    }
};

export const updateLesson = async (id, data) => {
    try {
        const lesson = await ax.put(`/api/lessons/${id}`, {
            data: data,
        });
        return lesson.data;
    } catch (error) {
        console.error("Error updating lesson:", error);
    }
};

export const deleteLesson = async (id) => {
    try {
        const response = await ax.delete(`/api/lessons/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting lesson:", error);
    }
};

// *** Quizzes ***
export const createQuizz = async (
    name,
    description,
    answer,
    pick,
    lessonId,
    students
) => {
    try {
        const quizz = await ax.post("/api/quizzes", {
            data: {
                Quiz: name,
                description: description,
                Answer: answer,
                pick: pick,
                lesson: [{ id: lessonId }],
                students: [students],
            },
        });
        return quizz.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneQuizz = async (id) => {
    try {
        const quizz = await ax.get(`/api/quizzes/${id}?populate=*`);
        return quizz.data;
    } catch (error) {
        console.error("Error fetching quizz:", error);
    }
};

export const updateQuizz = async (id, data) => {
    try {
        const quizz = await ax.put(`/api/quizzes/${id}`, {
            data: data,
        });
        return quizz.data;
    } catch (error) {
        console.error("Error updating quizz:", error);
    }
};

export const deleteQuizz = async (id) => {
    try {
        const response = await ax.delete(`/api/quizzes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting quizz:", error);
    }
};
