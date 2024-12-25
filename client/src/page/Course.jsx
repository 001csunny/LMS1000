import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import { deleteCourse, fetchMyCourse } from "../conf/api";
import { AuthContext } from "../contexts/AuthContext";

function Course() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CourseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // เพิ่มสถานะการโหลด
    const { state } = useContext(AuthContext);
    console.log("🚀 ~ Course ~ state:", state);
    const userRole = sessionStorage.getItem("userRole");

    const toggleModal = (state = !isModalOpen) => {
        setIsModalOpen(state);
    };
    const handleDeleteCourse = async (quizId) => {
        try {
            // ลบแบบทดสอบผ่าน API
            await deleteCourse(quizId);
            console.log(`Quiz with ID ${quizId} has been deleted.`);

            // Fetch ข้อมูลใหม่หลังจากลบสำเร็จ
            fetchLessonData(); // เรียกฟังก์ชัน fetch ข้อมูลใหม่
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const fetchCourseData = async () => {
        setIsLoading(true); // ตั้งสถานะเริ่มโหลดข้อมูล
        try {
            const data = await fetchMyCourse(userRole.toLowerCase(), state.id); // Assume fetchMyCourse is an async function
            setCourseData(data.data); // Store the course data
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setIsLoading(false); // โหลดเสร็จแล้ว
        }
    };

    useEffect(() => {
        // ตรวจสอบว่า state.id มีค่าก่อนเรียก fetchCourseData
        if (state?.id) {
            fetchCourseData();
        }
    }, [state?.id]); // รันเมื่อ state.id เปลี่ยนแปลง

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <div className=" h-full w-full p-8 ">
                <div className="flex flex-row justify-between">
                    <div className="text-5xl mb-4">วิชาเรียนทั้งหมด</div>
                    {userRole === "Admin" || userRole === "Teacher" ? (
                        <button
                            onClick={() => toggleModal(true)}
                            type="button"
                            className="w-40 rounded-2xl py-2.5 px-5 mb-2 mr-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            + เพิ่มวิชา
                        </button>
                    ) : null}
                </div>

                <div className="flex h-full w-full px-8">
                    <div className="w-full rounded-3xl bg-slate-100 pt-4">
                        {/* <div className="text-xl ml-8 mb-2">ชั้นเรียนทั้งหมด</div> */}
                        <div className="flex flex-wrap">
                            {isLoading ? (
                                // แสดงข้อความ Loading ขณะที่ข้อมูลกำลังถูกโหลด
                                <div className="text-center w-full">
                                    Loading...
                                </div>
                            ) : CourseData && CourseData.length > 0 ? (
                                CourseData.map((course, index) => (
                                    <CourseCard
                                        key={index}
                                        course={course}
                                        id={course.id}
                                        name={course.name}
                                        description={course.description}
                                        student={course.students}
                                        documentId={course.documentId}
                                        handleDeleteCourse={handleDeleteCourse}
                                    />
                                ))
                            ) : (
                                // ถ้าไม่มีข้อมูล
                                <div className="text-center w-full">
                                    ยังไม่มีวิชาที่สอน
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for adding a course */}
            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden={!isModalOpen ? "true" : "false"}
                className={`fixed bg-slate-500 bg-opacity-50 overflow-auto top-0 right-0 left-0 z-50 items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    isModalOpen ? "flex" : "hidden"
                }`}
            >
                <CourseForm id="courseForm" />
            </div>

            <Footer />
        </div>
    );
}

export default Course;
