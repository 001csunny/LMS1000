import axSpeech from "./apispeach2text";
import ax2sp from "./apitext2speach";
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

export const fetchMyCourse = async (role, id) => {
    try {
        const course = await ax.get(
            `/api/courses?filters[${role}s][id][$eq]=${id}&populate=*`
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

// *** Challenges ***

// สร้าง Challenge ใหม่
export const createChallenge = async (challengeName, wordIds, lessonId) => {
    try {
        const response = await ax.post("/api/challenges", {
            data: {
                challenge: challengeName,
                words: wordIds.map((id) => ({ id: id })), // เชื่อม Word IDs
                lesson: lessonId, // เชื่อม Lesson ID
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating challenge:", error);
    }
};

export const createTest = async (challengeName, wordIds, lessonId) => {
    try {
        const response = await ax.post("/api/tests", {
            data: {
                test: challengeName,
                words: wordIds.map((id) => ({ id: id })), // เชื่อม Word IDs
                lesson: lessonId, // เชื่อม Lesson ID
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating test:", error);
    }
};

// ดึงข้อมูล Challenge โดย `id`
export const fetchOneChallenge = async (id) => {
    try {
        const challenge = await ax.get(`/api/challenges/${id}?populate=*`);
        return challenge.data;
    } catch (error) {
        console.error("Error fetching challenge:", error);
    }
};
export const fetchOneTest = async (id) => {
    try {
        const challenge = await ax.get(`/api/tests/${id}?populate=*`);
        return challenge.data;
    } catch (error) {
        console.error("Error fetching test:", error);
    }
};

// อัปเดตข้อมูล Challenge
export const updateChallenge = async (id, data) => {
    try {
        const challenge = await ax.put(`/api/challenges/${id}`, {
            data: data,
        });
        return challenge.data;
    } catch (error) {
        console.error("Error updating challenge:", error);
    }
};

export const updateTest = async (id, data) => {
    try {
        const challenge = await ax.put(`/api/tests/${id}`, {
            data: data,
        });
        return challenge.data;
    } catch (error) {
        console.error("Error updating test:", error);
    }
};

// ลบ Challenge โดย `id`
export const deleteChallenge = async (id) => {
    try {
        const response = await ax.delete(`/api/challenges/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting challenge:", error);
    }
};

export const deleteTest = async (id) => {
    try {
        const response = await ax.delete(`/api/tests/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting test:", error);
    }
};
// ดึงข้อมูลทั้งหมดของ Challenge
export const fetchChallenges = async () => {
    try {
        const challenges = await ax.get("/api/challenges?populate=*");
        return challenges.data;
    } catch (error) {
        console.error("Error fetching challenges:", error);
    }
};

export const fetchTests = async () => {
    try {
        const challenges = await ax.get("/api/tests?populate=*");
        return challenges.data;
    } catch (error) {
        console.error("Error fetching test:", error);
    }
};

// *** Words ***

// สร้าง Word ใหม่
export const createWord = async (word, challengeIds) => {
    try {
        const wordData = await ax.post("/api/words", {
            data: {
                word: word,
                challenges: challengeIds.map((id) => ({ id: id })), // Array ของ `id` ของ challenge ที่เชื่อมโยง
            },
        });
        return wordData.data;
    } catch (error) {
        console.error("Error creating word:", error);
    }
};

// ดึงข้อมูล Word โดย `id`
export const fetchOneWord = async (id) => {
    try {
        const word = await ax.get(`/api/words/${id}?populate=*`);
        return word.data;
    } catch (error) {
        console.error("Error fetching word:", error);
    }
};

// อัปเดตข้อมูล Word
export const updateWord = async (id, data) => {
    try {
        const word = await ax.put(`/api/words/${id}`, {
            data: data,
        });
        return word.data;
    } catch (error) {
        console.error("Error updating word:", error);
    }
};

// ลบ Word โดย `id`
export const deleteWord = async (id) => {
    try {
        const response = await ax.delete(`/api/words/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting word:", error);
    }
};

// ดึงข้อมูลทั้งหมดของ Word
export const fetchWords = async () => {
    try {
        const words = await ax.get("/api/words?populate=*");
        return words.data;
    } catch (error) {
        console.error("Error fetching words:", error);
    }
};

export const textReader = async (word) => {
    try {
        const response = await ax2sp.post("", {
            // ตั้งค่าคำขอ POST โดยใช้ URL ว่าง
            input: { text: word },
            voice: {
                languageCode: "th-TH",
                name: "th-TH-Neural2-C",
            },
            audioConfig: {
                audioEncoding: "LINEAR16",
                effectsProfileId: ["small-bluetooth-speaker-class-device"],
                pitch: 0.4,
                speakingRate: 1.04,
            },
        });

        return response.data; // คืนค่าข้อมูลเสียง
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแปลงข้อความเป็นเสียง", error);
    }
};

export const updateUser = async (userId, data) => {
    try {
        const response = await ax.put(`/api/users/${userId}`, {
            username: data.username,
            email: data.email,
            Speach: data.Speach,
        });

        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // โยนข้อผิดพลาดออกไปให้ handle ด้านนอก
    }
};
export const speechToText = async (audioContent) => {
    try {
        const response = await axSpeech.post("", {
            config: {
                encoding: "LINEAR16", // รูปแบบการเข้ารหัสเสียง
                sampleRateHertz: 48000, // ความถี่ตัวอย่างของไฟล์เสียง
                languageCode: "th-TH", // ภาษาไทย
                enableAutomaticPunctuation: true, // เปิดใช้งานการใส่เครื่องหมายวรรคตอน
            },
            audio: {
                content: audioContent, // ไฟล์เสียงที่ถูกแปลงเป็น Base64
            },
        });

        // แสดงข้อมูลที่ได้รับจาก API
        console.log("API Response:", response.data);

        // ตรวจสอบว่ามีผลลัพธ์ใน response หรือไม่
        if (response.data?.results && Array.isArray(response.data.results)) {
            const transcripts = response.data.results
                .map((result) => {
                    // ตรวจสอบว่า alternatives[0] มีค่าหรือไม่
                    const transcript = result.alternatives[0]?.transcript;
                    if (!transcript) {
                        console.error(
                            "No transcript found for this result:",
                            result
                        );
                    }
                    return transcript;
                })
                .filter(Boolean); // กรองค่า null หรือ undefined

            // ถ้ามีข้อความที่แปลงแล้ว
            if (transcripts.length > 0) {
                return transcripts.join(" "); // รวบรวมข้อความจาก API
            } else {
                throw new Error("No valid transcript found.");
            }
        } else {
            throw new Error("No valid results found in the response.");
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแปลงเสียงเป็นข้อความ", error);
        throw error; // โยนข้อผิดพลาดออกไป
    }
};
