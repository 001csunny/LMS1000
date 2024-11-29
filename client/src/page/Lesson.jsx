import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuizz, fetchoneLesson } from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import QuizCard from "../components/lesson/QuizzCard";
import QuizModal from "../components/QuizModal"; 

const Lesson = () => {
    const { id } = useParams();
    const [LessonData, setLessonData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLessonData();
    }, []);

    const fetchLessonData = async () => {
        try {
            setLoading(true);
            const data = await fetchoneLesson(id);
            setLessonData(data.data || {});
        } catch (error) {
            console.error("Error fetching Lesson data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (quizId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );
        if (!confirmDelete) return;

        try {
            await deleteQuizz(quizId);
            fetchLessonData();
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const openModal = (quiz) => {
        setSelectedQuiz(quiz);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setIsModalOpen(false);
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
            <Header />
            <div className="h-full w-full p-8">
                <div className="text-5xl mb-4">
                    {LessonData.course?.name || "Loading..."}
                </div>
                <div className="flex h-full w-full px-4">
                    <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                        <button
                            onClick={() => openModal(null)}
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                        >
                            + Add Quiz
                        </button>
                    </div>
                    <div className="w-full rounded-r-3xl bg-slate-100 pt-4">
                        <div className="text-xl ml-8 mb-2">
                            {"Lesson " + LessonData.name}
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
                                        onCardClick={() => openModal(quizz)} // ส่งฟังก์ชันที่ถูกต้อง
                                    />
                                ))
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    No Quizzes available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* QuizModal สำหรับแสดงข้อมูล Quiz ที่เลือก */}
            {isModalOpen && selectedQuiz && (
                <QuizModal quizData={selectedQuiz} lesson={LessonData.name} closeModal={closeModal} />
            )}

            <Footer />
        </div>
    );
};

export default Lesson;
