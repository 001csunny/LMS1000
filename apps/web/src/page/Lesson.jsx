import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    deleteChallenge,
    deleteExam,
    deleteTest,
    fetchOneExam,
    fetchoneLesson,
    fetchOneTest,
} from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import SpeachChallenge from "../components/lesson/SpeachChallenge";
import SpeachCard from "../components/lesson/SpeachCard";
import SpeachModal from "../components/lesson/SpeachModal";
import CreateTest from "../components/lesson/Testpage/CreateTest";
import TestModal from "../components/lesson/Testpage/TestModal";
import CreateExam from "../components/lesson/Exam/CreateExam";
import ExamModal from "../components/lesson/Exam/ExamModal";

const Lesson = () => {
    const { id } = useParams();
    const [LessonData, setLessonData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false); 
    const [isSpeechModalOpendata, setIsSpeechModalOpendata] = useState(false); 
    const [selectedQuiz, setSelectedQuiz] = useState(null); 
    const [selectedSpeach, setSelectedSpeach] = useState(null);
    const [isCreateTest, setIsCreateTest] = useState(false);
    const [isCreateExam, setIsCreateExam] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);

    const [loading, setLoading] = useState(true); 
    const userRole = sessionStorage.getItem("userRole") || "USER";
    const isAdmin = userRole === "ADMIN" || userRole === "Admin" || userRole === "Teacher";

    useEffect(() => {
        fetchLessonData();
    }, []);

    const fetchTestData = async (testId) => {
        try {
            setLoading(true); 
            const testData = await fetchOneTest(testId); 
            setSelectedTest(testData); 
        } catch (error) {
            console.error("Error fetching test data:", error);
        } finally {
            setLoading(false); 
        }
    };
    const fetchExamData = async (testId) => {
        try {
            setLoading(true); 
            const testData = await fetchOneExam(testId); 
            setSelectedExam(testData); 
        } catch (error) {
            console.error("Error fetching exam data:", error);
        } finally {
            setLoading(false); 
        }
    };

    const fetchLessonData = async () => {
        try {
            setLoading(true); 
            const data = await fetchoneLesson(id);
            setLessonData(data.data || data || {});
        } catch (error) {
            console.error("Error fetching Lesson data:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleDeleteChallenge = async (quizId) => {
        try {
            await deleteChallenge(quizId);
            fetchLessonData(); 
        } catch (error) {
            console.error("Error deleting challenge:", error);
        }
    };
    const handleDeleteTest = async (quizId) => {
        try {
            await deleteTest(quizId);
            fetchLessonData(); 
        } catch (error) {
            console.error("Error deleting test:", error);
        }
    };
    const handleDeleteExam = async (quizId) => {
        try {
            await deleteExam(quizId);
            fetchLessonData(); 
        } catch (error) {
            console.error("Error deleting exam:", error);
        }
    };
    const openTestModal = () => {
        setIsTestModalOpen(true); 
    };
    const openExamModal = () => {
        setIsExamModalOpen(true); 
    };

    const closeTestModal = () => {
        setSelectedTest(null); 
        setIsTestModalOpen(false); 
    };
    const closeExamModal = () => {
        setSelectedExam(null); 
        setIsExamModalOpen(false); 
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuiz(null); 
    };

    const openSpeechModal = () => setIsSpeechModalOpen(true);
    const closeSpeechModal = () => setIsSpeechModalOpen(false);
    const openSpeechModaldata = () => setIsSpeechModalOpendata(true);
    const closeSpeechModaldata = () => setIsSpeechModalOpendata(false);
    const openCreateTest = () => setIsCreateTest(true);
    const closeCreateTest = () => setIsCreateTest(false);
    const openCreateExam = () => setIsCreateExam(true);
    const closeCreateExam = () => setIsCreateExam(false);

    const openQuizModal = (quiz) => {
        setSelectedQuiz(quiz); 
        setIsModalOpen(true); 
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 font-thai">
                <div className="flex flex-col items-center">
                    <div className="inline-block animate-spin w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 mb-4"></div>
                    <div className="text-xl text-gray-500">กำลังโหลด (Loading)...</div>
                </div>
            </div>
        );
    }

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
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800">
                        {LessonData.course?.name || "Loading..."}
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {isAdmin && (
                        <div className="w-full md:w-1/4">
                            <div className="glass-panel bg-white/60 border border-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-lg h-full">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">จัดการบทเรียน</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={openSpeechModal}
                                        type="button"
                                        className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                    >
                                        + เพิ่มแบบเรียนฝึกพูด
                                    </button>
                                    <button
                                        onClick={openCreateTest}
                                        type="button"
                                        className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                    >
                                        + เพิ่มแบบฝึกหัด
                                    </button>
                                    <button
                                        onClick={openCreateExam}
                                        type="button"
                                        className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                    >
                                        + เพิ่มแบบทดสอบ
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`w-full ${isAdmin ? 'md:w-3/4' : 'w-full'}`}>
                        <div className="glass-panel bg-white/40 border border-white/50 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-lg min-h-[500px]">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                บทเรียน: {LessonData.name}
                            </h2>
                            <p className="text-xl text-gray-500 mb-10">
                                {LessonData.description}
                            </p>

                            <div className="space-y-12">
                                {/* Challenges Section */}
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold">1</div>
                                        <h3 className="text-2xl font-bold text-gray-800">แบบเรียนฝึกออกเสียง</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {LessonData.challenges?.length > 0 ? (
                                            LessonData.challenges.map((quizz, index) => (
                                                <SpeachCard
                                                    quizz={quizz}
                                                    type={"challenges"}
                                                    key={index}
                                                    onDelete={handleDeleteChallenge}
                                                    isAdmin={isAdmin}
                                                    onCardClick={() => {
                                                        setSelectedSpeach(quizz); 
                                                        openSpeechModaldata(); 
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-full py-8 text-center bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                                <p className="text-gray-500">ยังไม่มีแบบเรียนฝึกออกเสียงในบทเรียนนี้</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tests Section */}
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3 font-bold">2</div>
                                        <h3 className="text-2xl font-bold text-gray-800">แบบฝึกหัดทบทวน</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {LessonData.tests?.length > 0 ? (
                                            LessonData.tests.map((quizz, index) => (
                                                <SpeachCard
                                                    quizz={quizz}
                                                    type={"tests"}
                                                    key={index}
                                                    isAdmin={isAdmin}
                                                    onDelete={handleDeleteTest}
                                                    onCardClick={() => {
                                                        setSelectedTest(quizz); 
                                                        openTestModal(); 
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-full py-8 text-center bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                                <p className="text-gray-500">ยังไม่มีแบบฝึกหัดในบทเรียนนี้</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Exams Section */}
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3 font-bold">3</div>
                                        <h3 className="text-2xl font-bold text-gray-800">แบบทดสอบวัดผล</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {LessonData.exams?.length > 0 ? (
                                            LessonData.exams.map((quizz, index) => (
                                                <SpeachCard
                                                    quizz={quizz}
                                                    type={"exams"}
                                                    key={index}
                                                    isAdmin={isAdmin}
                                                    onDelete={handleDeleteExam}
                                                    onCardClick={() => {
                                                        setSelectedExam(quizz); 
                                                        openExamModal(); 
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-full py-8 text-center bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                                <p className="text-gray-500">ยังไม่มีแบบทดสอบในบทเรียนนี้</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isSpeechModalOpen && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isSpeechModalOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm"
                >
                    <div className="relative bg-white rounded-3xl w-[90%] md:w-[60%] lg:w-[50%] h-[80%] shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">เพิ่มแบบเรียนฝึกพูด</h3>
                            <button
                                onClick={closeSpeechModal}
                                type="button"
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full p-2 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <SpeachChallenge
                                closeModal={closeSpeechModal}
                                LessonId={LessonData.id}
                                refreshData={fetchLessonData}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isSpeechModalOpendata && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isSpeechModalOpendata}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <SpeachModal
                            selectedSpeach={selectedSpeach} 
                            closeModal={closeSpeechModaldata} 
                        />
                    </div>
                </div>
            )}

            {isCreateTest && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isCreateTest}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">เพิ่มแบบฝึกหัดใหม่</h3>
                            <button
                                onClick={closeCreateTest}
                                type="button"
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full p-2 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <CreateTest
                                closeModal={closeCreateTest}
                                LessonId={LessonData.id}
                                refreshData={fetchLessonData}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isCreateExam && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isCreateExam}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">เพิ่มแบบทดสอบใหม่</h3>
                            <button
                                onClick={closeCreateExam}
                                type="button"
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full p-2 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <CreateExam
                                closeModal={closeCreateExam}
                                LessonId={LessonData.id}
                                refreshData={fetchLessonData}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isTestModalOpen && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isTestModalOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-end p-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
                            <button
                                onClick={closeTestModal}
                                className="text-gray-500 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <TestModal
                                challengeData={selectedTest}
                                selectedTest={selectedTest} 
                                closeModal={closeTestModal} 
                                fetchTestData={fetchTestData}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isExamModalOpen && (
                <div
                    tabIndex={-1}
                    aria-hidden={!isExamModalOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/60 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                         <div className="flex justify-end p-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
                            <button
                                onClick={closeExamModal}
                                className="text-gray-500 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <ExamModal
                                challengeData={selectedExam}
                                selectedExam={selectedExam} 
                                closeModal={closeExamModal} 
                                fetchExamData={fetchExamData}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Lesson;
