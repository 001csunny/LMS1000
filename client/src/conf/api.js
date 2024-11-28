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

export const createCourse = async (coursename, description) => {
    try {
        const course = await ax.post("/api/courses", {
            data: {
                name: coursename,
                description: description,
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

export const fetchoneCourse = async (id) => {
    try {
        const course = await ax.get(`/api/courses/${id}`);
        return course.data;
    } catch (error) {
        console.error("Error fetching course:", error);
    }
};

export const createLesson = async (lessonname, description, file) => {
    try {
        const formData = new FormData();
        formData.append("name", lessonname);
        formData.append("description", description);

        if (file) {
            formData.append("file", file);
        }
        const response = await axios.post("/api/lessons", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating lesson:", error);
    }
};
