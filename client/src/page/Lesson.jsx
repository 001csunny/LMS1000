import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    deleteChallenge,
    deleteQuizz,
    deleteTest,
    fetchOneExam,
    fetchoneLesson,
} from "../conf/api";
import Header from "../components/header";
import Footer from "../components/footer";
import QuizCard from "../components/lesson/QuizzCard";
import QuizzForm from "../components/lesson/quizzForm";
import QuizModal from "../components/QuizModal";
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
    console.log("🚀 ~ Lesson ~ LessonData:", LessonData);
    const [isModalOpen, setIsModalOpen] = useState(false); // Add quiz form modal state
    const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false); // Add speech challenge modal state
    const [isSpeechModalOpendata, setIsSpeechModalOpendata] = useState(false); // Add speech challenge modal state
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Store selected quiz for editing
    const [selectedSpeach, setSelectedSpeach] = useState(null);
    const [isCreateTest, setIsCreateTest] = useState(false);
    const [isCreateExam, setIsCreateExam] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);

    const [loading, setLoading] = useState(true); // Loading state
    const userRole = sessionStorage.getItem("userRole");
    // Fetch course data on component mount
    useEffect(() => {
        fetchLessonData();
    }, []);

    const fetchTestData = async (testId) => {
        try {
            setLoading(true); // เริ่มแสดงสถานะ Loading
            const testData = await fetchOneTest(testId); // เรียก API เพื่อดึงข้อมูล
            setSelectedTest(testData); // เก็บข้อมูล Test ที่ดึงมาได้
        } catch (error) {
            console.error("Error fetching test data:", error);
        } finally {
            setLoading(false); // หยุดแสดงสถานะ Loading
        }
    };
    const fetchExamData = async (testId) => {
        try {
            setLoading(true); // เริ่มแสดงสถานะ Loading
            const testData = await fetchOneExam(testId); // เรียก API เพื่อดึงข้อมูล
            setSelectedExam(testData); // เก็บข้อมูล Test ที่ดึงมาได้
        } catch (error) {
            console.error("Error fetching test data:", error);
        } finally {
            setLoading(false); // หยุดแสดงสถานะ Loading
        }
    };

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

    const handleDeleteChallenge = async (quizId) => {
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
    const handleDeleteTest = async (quizId) => {
        try {
            // ลบแบบทดสอบผ่าน API
            await deleteTest(quizId);
            console.log(`Quiz with ID ${quizId} has been deleted.`);

            // Fetch ข้อมูลใหม่หลังจากลบสำเร็จ
            fetchLessonData(); // เรียกฟังก์ชัน fetch ข้อมูลใหม่
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };
    const openTestModal = () => {
        setIsTestModalOpen(true); // Open TestModal
    };

    const closeTestModal = () => {
        setSelectedTest(null); // Clear selected test
        setIsTestModalOpen(false); // Close TestModal
    };
    const closeExamModal = () => {
        setSelectedExam(null); // Clear selected test
        setIsExamModalOpen(false); // Close TestModal
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
    const openCreateTest = () => setIsCreateTest(true);
    const closeCreateTest = () => setIsCreateTest(false);
    const openCreateExam = () => setIsCreateExam(true);
    const closeCreateExam = () => setIsCreateExam(false);

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
                    {userRole === "Admin" || userRole === "Teacher" ? (
                        <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                            {/* Add Lesson Button */}
                            <button
                                onClick={openSpeechModal}
                                type="button"
                                className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                + เพิ่มแบบเรียน
                            </button>
                            <button
                                onClick={openCreateTest}
                                type="button"
                                className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                + เพิ่มแบบฝึก
                            </button>

                            <button
                                onClick={openCreateExam}
                                type="button"
                                className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                + เพิ่มแบบทดสอบ
                            </button>

                            {/* Edit Course Button */}
                            {/* <button
                              type="button"
                              className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                              Edit
                          </button> */}
                        </div>
                    ) : null}

                    {/* Lessons Section */}
                    <div className="w-full rounded-r-3xl bg-slate-100 pt-4">
                        <div className="text-2xl ml-8 mb-2">
                            {"บทเรียน" + " " + LessonData.name}
                        </div>
                        <div className="ml-8 text-xl text-gray-500">
                            {LessonData.description}
                        </div>
                        <div className="flex flex-col px-2">
                            {/* {LessonData.quizzes?.length > 0 ? (
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
                            )} */}
                            {LessonData.challenges?.length > 0 ? (
                                <>
                                    <div className="mx-10 my-4 text-xl">
                                        แบบเรียน
                                    </div>
                                    {LessonData.challenges.map(
                                        (quizz, index) => (
                                            <SpeachCard
                                                quizz={quizz}
                                                type={"challenges"}
                                                key={index}
                                                onDelete={handleDeleteChallenge}
                                                onCardClick={() => {
                                                    setSelectedSpeach(quizz); // เก็บข้อมูล Challenge ที่เลือก
                                                    openSpeechModaldata(); // เปิด Modal
                                                }}
                                            />
                                        )
                                    )}
                                </>
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    ยังไม่มีแบบเรียน
                                </div>
                            )}

                            {LessonData.tests?.length > 0 ? (
                                <>
                                    <div className="mx-10 my-4 text-xl">
                                        แบบฝึกหัด
                                    </div>
                                    {LessonData.tests.map((quizz, index) => (
                                        <SpeachCard
                                            quizz={quizz}
                                            type={"tests"}
                                            key={index}
                                            onDelete={handleDeleteTest}
                                            onCardClick={() => {
                                                setSelectedTest(quizz); // เก็บข้อมูล Challenge ที่เลือก
                                                openTestModal(); // เปิด Modal
                                            }}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    ยังไม่มีแบบฝึก
                                </div>
                            )}
                            {LessonData.tests?.length > 0 ? (
                                <>
                                    <div className="mx-10 my-4 text-xl">
                                        แบบทดสอบ
                                    </div>
                                    {(LessonData.exams || []).map(
                                        (quizz, index) => (
                                            <SpeachCard
                                                quizz={quizz}
                                                type={"tests"}
                                                key={index}
                                                onDelete={handleDeleteTest}
                                                onCardClick={() => {
                                                    setSelectedExam(quizz); // เก็บข้อมูล Challenge ที่เลือก
                                                    openTestModal(); // เปิด Modal
                                                }}
                                            />
                                        )
                                    )}
                                </>
                            ) : (
                                <div className="ml-8 text-gray-500">
                                    ยังไม่มีแบบทดสอบ
                                </div>
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
                    className="fixed bg-slate-900 bg-opacity-90 overflow-auto  z-50 flex items-center justify-center w-full  h-[calc(100%-1rem)]"
                >
                    <div className="relative rounded-lg w-[90%] h-[80%]">
                        <SpeachModal
                            selectedSpeach={selectedSpeach} // ส่งข้อมูลที่เลือก
                            closeModal={closeSpeechModaldata} // ปิด Modal
                        />
                    </div>
                </div>
            )}
            {isCreateTest && (
                <div
                    id="speech-modal"
                    tabIndex={-1}
                    aria-hidden={!isCreateTest}
                    className="fixed bg-slate-900 bg-opacity-90 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative rounded-lg  w-[90%] h-[80%] ">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeCreateTest}
                                type="button"
                                className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center w-5 h-5 justify-center"
                            >
                                ✕
                            </button>
                        </div>
                        <CreateTest
                            closeModal={closeCreateTest}
                            LessonId={LessonData.id}
                            refreshData={fetchLessonData}
                        />
                    </div>
                </div>
            )}
            {isCreateExam && (
                <div
                    id="speech-modal"
                    tabIndex={-1}
                    aria-hidden={!isCreateExam}
                    className="fixed bg-slate-900 bg-opacity-90 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative rounded-lg  w-[90%] h-[80%] ">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeCreateExam}
                                type="button"
                                className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center w-5 h-5 justify-center"
                            >
                                ✕
                            </button>
                        </div>
                        <CreateExam
                            closeModal={closeCreateExam}
                            LessonId={LessonData.id}
                            refreshData={fetchLessonData}
                        />
                    </div>
                </div>
            )}
            {/* Test Modal */}
            {isTestModalOpen && (
                <div
                    id="test-modal"
                    tabIndex={-1}
                    aria-hidden={!isTestModalOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white"
                >
                    <div className="relative rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-w-lg max-h-full">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeTestModal}
                                className="text-gray-500 hover:text-black focus:outline-none"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <TestModal
                            challengeData={selectedTest}
                            selectedTest={selectedTest} // Pass selected test
                            closeModal={closeTestModal} // Close modal handler
                            fetchTestData={fetchTestData}
                        />
                    </div>
                </div>
            )}
            {isExamModalOpen && (
                <div
                    id="test-modal"
                    tabIndex={-1}
                    aria-hidden={!isExamModalOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white"
                >
                    <div className="relative rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-w-lg max-h-full">
                        <div className="flex justify-end p-2">
                            <button
                                onClick={closeExamModal}
                                className="text-gray-500 hover:text-black focus:outline-none"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <ExamModal
                            challengeData={selectedExam}
                            selectedTest={selectedExam} // Pass selected test
                            closeModal={closeExamModal} // Close modal handler
                            fetchTestData={fetchExamData}
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
