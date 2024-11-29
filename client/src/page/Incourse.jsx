import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchoneCourse } from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import LessonForm from "../components/lesson/LessonForm";
import LessonCard from "../components/lesson/LessonCard";

const Incourse = () => {
    const { id } = useParams(); // Course ID from URL
    const location = useLocation();
    const [CourseData, setCourseData] = useState({});
    console.log("🚀 ~ Lesson ~ CourseData:", CourseData)
    const [isModalOpen, setIsModalOpen] = useState(false);



    // Fetch course data on component mount
    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const data = await fetchoneCourse(id);
            setCourseData(data.data || {});
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col h-screen w-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="h-full w-full p-8">
                {/* Course Name */}
                <div className="text-5xl mb-4">
                    {CourseData.name || "Loading..."}
                </div>

                <div className="flex h-full w-full px-4">
                    {/* Sidebar */}
                    <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                        {/* Add Lesson Button */}
                        <button
                            onClick={openModal}
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            + Add Lesson
                        </button>

                        {/* Edit Course Button */}
                        <button
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Edit
                        </button>
                    </div>

                    {/* Lessons Section */}
                    <div className="w-full rounded-r-3xl bg-slate-100 pt-4">
                        <div className="text-xl ml-8 mb-2">Total Lesson</div>
                        <div className="flex flex-wrap">
                            {CourseData.lessons?.length > 0 ? (
                                CourseData.lessons.map((lesson, index) => (
                                    <LessonCard
                                        key={index}
                                        name={lesson.name}
                                        description={lesson.description}
                                        documentId={lesson.documentId}
                                    />
                                ))
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    No Lessons available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Lessons */}
            {isModalOpen && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden={!isModalOpen}
                    className="fixed bg-slate-500 bg-opacity-50 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                                ✕
                            </button>
                        </div>
                        <LessonForm
                            closeModal={closeModal}
                            id={CourseData.id}
                            refreshData={fetchCourseData}
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Incourse;
