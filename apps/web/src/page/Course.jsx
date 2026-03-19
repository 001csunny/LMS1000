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
    const [isLoading, setIsLoading] = useState(true); 
    const { state } = useContext(AuthContext);
    const userRole = sessionStorage.getItem("userRole") || "USER";

    const toggleModal = (modalState = !isModalOpen) => {
        setIsModalOpen(modalState);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            fetchCourseData(); 
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const fetchCourseData = async () => {
        setIsLoading(true); 
        try {
            // Note: Since NestJS uses `ADMIN` and `USER` roles, pass it properly
            const data = await fetchMyCourse(userRole.toLowerCase(), state.id); 
            // In NestJS, data might be returned directly or wrapped in data property
            setCourseData(data.data || data); 
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (state?.id) {
            fetchCourseData();
        }
    }, [state?.id]); 

    const isAdmin = userRole === "ADMIN" || userRole === "Admin" || userRole === "Teacher";

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gray-50 font-thai relative">
            {/* Background elements for glassmorphism effect */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <Header />
            <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="text-4xl md:text-5xl font-display font-bold text-gray-800">วิชาเรียนทั้งหมด</div>
                    {isAdmin && (
                        <button
                            onClick={() => toggleModal(true)}
                            type="button"
                            className="mt-4 md:mt-0 w-full md:w-auto rounded-xl py-3 px-6 text-sm font-medium text-white bg-gray-900 border border-transparent shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-thai"
                        >
                            + เพิ่มวิชาใหม่
                        </button>
                    )}
                </div>

                <div className="glass-panel w-full rounded-3xl p-6 md:p-8 backdrop-blur-xl border border-white/50 shadow-xl bg-white/40">
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                        {isLoading ? (
                            <div className="text-center w-full py-12 text-gray-500 font-thai text-lg">
                                <div className="inline-block animate-spin w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-600 mb-4"></div>
                                <div>กำลังโหลดข้อมูลวิชาเรียน...</div>
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
                                    documentId={course.documentId || course.id} // Fallback to id if documentId doesn't exist
                                    handleDeleteCourse={handleDeleteCourse} 
                                />
                            ))
                        ) : (
                            <div className="text-center w-full py-12 text-gray-500 font-thai text-lg">
                                ยังไม่มีวิชาที่สอน
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for adding a course */}
            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden={!isModalOpen ? "true" : "false"}
                className={`fixed bg-gray-900/50 backdrop-blur-sm overflow-auto top-0 right-0 left-0 z-50 items-center justify-center w-full md:inset-0 h-full ${
                    isModalOpen ? "flex" : "hidden"
                }`}
            >
                <div className="glass-panel border border-white/20 bg-white/90 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                     {/* The CourseForm component will render inside here */}
                     <CourseForm id="courseForm" closeModal={() => toggleModal(false)} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Course;
