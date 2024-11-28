import ax from "./ax";
import conf from "./main";

export const getCurrentUser = async () => {
    try {
        const user = await ax.get(conf.jwtUserEndpoint);
        return user.data;
    } catch (error) {
        console.error(error);
    }
};

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
        const course = await ax.get("/api/courses?populate=*", {});
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const editCourse = async (req, res) => {
    try {
        const course = await ax.put();
        return course.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchMyCourse = async () => {
    try {
        const course = await ax.get(conf.myCourseEndpoint);
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

export const createLesson = async (lessonname, description, courseId, file) => {
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
