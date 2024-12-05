import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteChallenge, deleteQuizz, fetchoneLesson } from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import QuizCard from "../components/lesson/QuizzCard";
import QuizzForm from "../components/lesson/quizzForm";
import QuizModal from "../components/QuizModal";
import SpeachChallenge from "../components/lesson/SpeachChallenge";
import SpeachCard from "../components/lesson/SpeachCard";
import SpeachModal from "../components/lesson/SpeachModal";

const Lesson = () => {
    const { id } = useParams();
    const [LessonData, setLessonData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // Add quiz form modal state
    const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false); // Add speech challenge modal state
    const [isSpeechModalOpendata, setIsSpeechModalOpendata] = useState(false); // Add speech challenge modal state
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Store selected quiz for editing
    const [selectedSpeach, setSelectedSpeach] = useState(null);
    console.log("🚀 ~ Lesson ~ selectedQuiz:", selectedQuiz);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch course data on component mount
    useEffect(() => {
        fetchLessonData();
    }, []);

    const fetchLessonData = async () => {
        try {
            setLoading(true); // Set loading true before fetch
            const data = await fetchoneLesson(id);
            setLessonData(data.data || {});
        } catch (error) {
            console.error("Error fetching Lesson data:", error);
        } finally {
            setLoading(false); // Set loading false after fetch completes
        }
    };

    const handleDelete = async (quizId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );
        if (!confirmDelete) return;

        try {
            // ลบแบบทดสอบผ่าน API
            await deleteQuizz(quizId);
            console.log(`Quiz with ID ${quizId} has been deleted.`);

            // Fetch ข้อมูลใหม่หลังจากลบสำเร็จ
            fetchLessonData(); // เรียกฟังก์ชัน fetch ข้อมูลใหม่
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const handleDeleteChallenge = async (quizId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );
        if (!confirmDelete) return;

        try {
            // ลบแบบทดสอบผ่าน API
            await deleteChallenge(quizId);
            console.log(`Quiz with ID ${quizId} has been deleted.`);

            // Fetch ข้อมูลใหม่หลังจากลบสำเร็จ
            fetchLessonData(); // เรียกฟังก์ชัน fetch ข้อมูลใหม่
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuiz(null); // Clear selected quiz when closing the modal
    };

    const openSpeechModal = () => setIsSpeechModalOpen(true);
    const closeSpeechModal = () => setIsSpeechModalOpen(false);
    const openSpeechModaldata = () => setIsSpeechModalOpendata(true);
    const closeSpeechModaldata = () => setIsSpeechModalOpendata(false);

    const openQuizModal = (quiz) => {
        setSelectedQuiz(quiz); // Set the selected quiz to be edited
        setIsModalOpen(true); // Open the modal
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="h-full w-full p-8">
                {/* Course Name */}
                <div className="text-5xl mb-4">
                    {LessonData.course?.name || "Loading..."}
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
                            + Add Quizz
                        </button>
                        <button
                            onClick={openSpeechModal}
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            + Add Speech Challenge
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
                        <div className="text-xl ml-8 mb-2">
                            {"Lesson" + " " + LessonData.name}
                        </div>
                        <div className="ml-8 text-gray-500">
                            Description {LessonData.description}
                        </div>
                        <div className="flex flex-wrap">
                            {LessonData.quizzes?.length > 0 ? (
                                LessonData.quizzes.map((quizz, index) => (
                                    <QuizCard
                                        quizz={quizz}
                                        key={index}
                                        onDelete={handleDelete}
                                        onCardClick={() => openQuizModal(quizz)} // Open QuizModal with selected quiz
                                    />
                                ))
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    No Quizzes available
                                </div>
                            )}
                            {LessonData.challenges?.length > 0 ? (
                                LessonData.challenges.map((quizz, index) => (
                                    <SpeachCard
                                        quizz={quizz}
                                        key={index}
                                        onDelete={handleDeleteChallenge}
                                        onCardClick={() => {
                                            setSelectedSpeach(quizz); // เก็บข้อมูล Challenge ที่เลือก
                                            openSpeechModaldata(); // เปิด Modal
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="ml-8 text-gray-500"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Adding or Editing Quizzes */}
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

                        {/* If selectedQuiz exists, show QuizModal for editing, otherwise show QuizzForm for adding */}
                        {selectedQuiz ? (
                            <QuizModal
                                quizData={selectedQuiz}
                                closeModal={closeModal}
                                refreshData={fetchLessonData}
                            />
                        ) : (
                            <QuizzForm
                                closeModal={closeModal}
                                id={LessonData.id}
                                refreshData={fetchLessonData}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Modal for Adding Speech Challenge */}
            {isSpeechModalOpen && (
                <div
                    id="speech-modal"
                    tabIndex={-1}
                    aria-hidden={!isSpeechModalOpen}
                    className="fixed bg-slate-900 bg-opacity-90 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative rounded-lg  w-[90%] h-[80%] ">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeSpeechModal}
                                type="button"
                                className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center w-5 h-5 justify-center"
                            >
                                ✕
                            </button>
                        </div>
                        <SpeachChallenge
                            closeModal={closeSpeechModal}
                            LessonId={LessonData.id}
                            refreshData={fetchLessonData}
                        />
                    </div>
                </div>
            )}
            {isSpeechModalOpendata && (
                <div
                    id="speech-modal"
                    tabIndex={-1}
                    aria-hidden={!isSpeechModalOpendata}
                    className="fixed bg-slate-900 bg-opacity-90 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative rounded-lg w-[90%] h-[80%]">
                        <SpeachModal
                            selectedSpeach={selectedSpeach} // ส่งข้อมูลที่เลือก
                            closeModal={closeSpeechModaldata} // ปิด Modal
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Lesson;
