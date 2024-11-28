import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchoneCourse } from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import CourseForm from "../components/CourseForm";
import LessonCard from "../components/lesson/LessonCard";
import LessonForm from "../components/lesson/LessonForm";

const Incourse = () => {
    const { id } = useParams();
    const location = useLocation();
    const { documentID } = location.state || {};
    const [CourseData, setCourseData] = useState(null);
    console.log("🚀 ~ Incourse ~ CourseData:", CourseData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (state = !isModalOpen) => {
        setIsModalOpen(state);
    };

    const fetchCourseData = async () => {
        try {
            const data = await fetchoneCourse(documentID);
            // console.log("🚀 ~ fetchCourseData ~ data:", data.data)
            setCourseData(data.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourseData(); // Fetch courses on component mount
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <div className="h-full w-full p-8">
                <div className="text-5xl mb-4">{id}</div>
                <div className="flex h-full w-full px-4">
                    <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                        <button
                            onClick={() => toggleModal(true)}
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            + Add Lesson
                        </button>
                        <button
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="w-full rounded-r-3xl bg-slate-100 pt-4">
                        <div className="text-xl ml-8 mb-2">Total Lesson</div>
                        <div className="flex flex-wrap">
                            {/* Map over the courses and display each course */}
                            {CourseData && CourseData.length > 0 ? (
                                CourseData.map((course, index) => (
                                    <LessonCard
                                        course={course}
                                        id={course.id}
                                        name={course.name}
                                        description={course.description}
                                        student={course.students}
                                        documentId={course.documentId}
                                    />
                                ))
                            ) : (
                                <div>No Lesson available</div>
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
                <LessonForm id="courseForm" />
            </div>

            <Footer />
        </div>
    );
};

export default Incourse;
