import ax from "./ax";
import conf from "./main";

// *** Users ***
export const getCurrentUser = async () => {
    try {
        const user = await ax.get(conf.jwtUserEndpoint);
        return user.data; // NestJS returns flat data
    } catch (error) {
        console.error(error);
    }
};

// *** Courses ***
export const createCourse = async (coursename, description, teacherId) => {
    try {
        const course = await ax.post("/courses", {
            name: coursename,
            description: description,
        });
        // Enroll teacher separately if needed based on the new API, or NestJS handles it
        await ax.post(`/courses/${course.data.id}/enroll/${teacherId}`);
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchCourse = async () => {
    try {
        const course = await ax.get("/courses");
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchMyCourse = async (role, id) => {
    try {
        // NestJS backend accepts role query param or infers from token
        const course = await ax.get(`/courses/mine?role=${role}`);
        return course.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneCourse = async (id) => {
    try {
        const course = await ax.get(`/courses/${id}`);
        return course.data;
    } catch (error) {
        console.error("Error fetching course:", error);
    }
};

export const updateCourse = async (id, data) => {
    try {
        const course = await ax.put(`/courses/${id}`, data);
        return course.data;
    } catch (error) {
        console.error("Error updating course:", error);
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await ax.delete(`/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error);
    }
};

// *** Lessons ***
export const createLesson = async (lessonname, description, courseId) => {
    try {
        const lesson = await ax.post("/lessons", {
            name: lessonname,
            description: description,
            courseId: courseId,
        });
        return lesson.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneLesson = async (id) => {
    try {
        const lesson = await ax.get(`/lessons/${id}`);
        return lesson.data;
    } catch (error) {
        console.error("Error fetching lesson:", error);
    }
};

export const updateLesson = async (id, data) => {
    try {
        const lesson = await ax.put(`/lessons/${id}`, data);
        return lesson.data;
    } catch (error) {
        console.error("Error updating lesson:", error);
    }
};

export const deleteLesson = async (id) => {
    try {
        const response = await ax.delete(`/lessons/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting lesson:", error);
    }
};

// *** Quizzes (Map to Tests in NestJS) ***
export const createQuizz = async (
    name,
    description,
    answer,
    pick,
    lessonId,
    students
) => {
    try {
        const quizz = await ax.post("/lessons/tests", {
            name: name,
            lessonId: lessonId,
            // Assuming the new API structure for a test. 
            // In a real migration you'd align the DB schema perfectly.
        });
        return quizz.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchoneQuizz = async (id) => {
    // Left as stub if frontend components still call it.
    console.warn("fetchoneQuizz logic migrating to tests/exams array on lesson");
};

export const updateQuizz = async (id, data) => { /* Stub */ };
export const deleteQuizz = async (id) => { /* Stub */ };

// *** Challenges ***
export const createChallenge = async (challengeName, wordIds, lessonId) => {
    try {
        const response = await ax.post("/lessons/challenges", {
            name: challengeName,
            wordIds: wordIds,
            lessonId: lessonId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating challenge:", error);
    }
};

export const createExam = async (challengeName, wordIds, lessonId) => {
    try {
        const response = await ax.post("/lessons/exams", {
            name: challengeName,
            wordIds: wordIds,
            lessonId: lessonId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating exam:", error);
    }
};

export const createTest = async (challengeName, wordIds, lessonId) => {
    try {
        const response = await ax.post("/lessons/tests", {
            name: challengeName,
            wordIds: wordIds,
            lessonId: lessonId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating test:", error);
    }
};

export const fetchOneChallenge = async (id) => { /* stub */ };
export const fetchOneExam = async (id) => { /* stub */ };
export const fetchOneTest = async (id) => { /* stub */ };
export const updateChallenge = async (id, data) => { /* stub */ };
export const updateTest = async (id, data) => { /* stub */ };

export const deleteChallenge = async (id) => {
    try { return (await ax.delete(`/lessons/challenges/${id}`)).data; } catch (e) { console.error(e); }
};
export const deleteExam = async (id) => {
    try { return (await ax.delete(`/lessons/exams/${id}`)).data; } catch (e) { console.error(e); }
};
export const deleteTest = async (id) => {
    try { return (await ax.delete(`/lessons/tests/${id}`)).data; } catch (e) { console.error(e); }
};

export const fetchChallenges = async () => { /* stub */ };
export const fetchTests = async () => { /* stub */ };

// *** Words ***
export const createWord = async (word, challengeIds) => {
    try {
        const wordData = await ax.post("/words", { word: word });
        return wordData.data;
    } catch (error) {
        console.error("Error creating word:", error);
    }
};

export const fetchOneWord = async (id) => {
    try { return (await ax.get(`/words/${id}`)).data; } catch (e) { console.error(e); }
};

export const updateWord = async (id, data) => {
    try { return (await ax.put(`/words/${id}`, data)).data; } catch (e) { console.error(e); }
};

export const deleteWord = async (id) => {
    try { return (await ax.delete(`/words/${id}`)).data; } catch (e) { console.error(e); }
};

export const fetchWords = async () => {
    try { return (await ax.get("/words")).data; } catch (e) { console.error(e); }
};

export const textReader = async (word) => {
    // This used external API before. Let's keep it or proxy it via backend.
    console.warn("TextReader called, should be implemented via NestJS back-end or directly");
};

export const updateUser = async (userId, data) => {
    try {
        // Now using NestJS /users/me since normal users shouldn't pass arbitrary IDs
        const response = await ax.put(`/users/me`, {
            username: data.username,
            email: data.email,
            speechToken: data.Speach, // Note mapping Speach -> speechToken
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Replaces direct GCP call with backend proxy
export const speechToText = async (audioContent) => {
    try {
        const response = await ax.post("/speech/transcribe", {
            audioBase64: audioContent,
            sampleRateHertz: 48000,
        });

        if (response.data?.transcript) {
            return response.data.transcript;
        } else {
            throw new Error(response.data?.message || "No valid transcript found.");
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแปลงเสียงเป็นข้อความ", error);
        throw error;
    }
};

export const addXp = async (amount) => {
    try {
        const response = await ax.patch("/users/me/xp", { amount });
        return response.data;
    } catch (error) {
        console.error("Error adding XP", error);
    }
};

