import React, { useEffect, useState } from "react";
import WordCard from "../speach/WordCard";
import {
    createChallenge,
    createWord,
    deleteWord,
    fetchWords,
} from "../../conf/api";

function SpeachChallenge({ closeModal, LessonId, refreshData }) {
    const [quizTitle, setQuizTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal สำหรับ Add Word
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal สำหรับ Delete
    const [newWord, setNewWord] = useState("");
    const [challengeIds] = useState([]); // ตัวอย่าง Challenge IDs (แก้ไขตามจริง)
    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState({}); // เก็บสถานะ checkbox
    const [selectedWordsDelete, setSelectedWordsDelete] = useState({}); // เก็บสถานะ checkbox

    const handleCreateQuiz = async () => {
        if (!quizTitle.trim()) {
            alert("Please enter a quiz title.");
            return;
        }

        const selectedIds = Object.keys(selectedWords).filter(
            (id) => selectedWords[id] // เอาเฉพาะคำที่ถูกเลือก
        );

        if (selectedIds.length === 0) {
            alert("Please select at least one word.");
            return;
        }

        setLoading(true); // เริ่มโหลด
        try {
            const result = await createChallenge(
                quizTitle,
                selectedIds,
                LessonId
            ); // เรียก API สร้าง Quiz
            setQuizTitle(""); // รีเซ็ต Quiz Title
            setSelectedWords({}); // รีเซ็ตคำที่เลือก
            refreshData()
            closeModal()
        } catch (error) {
            console.error("Failed to create quiz:", error);
            alert("Failed to create quiz.");
        } finally {
            setLoading(false); // จบโหลด
        }
    };

    const handleAddWord = async () => {
        if (!newWord.trim()) return; // ตรวจสอบว่ามีคำหรือไม่
        setLoading(true); // เริ่มโหลด
        try {
            const result = await createWord(newWord, challengeIds); // เรียก API สร้างคำใหม่
            console.log("Word created successfully:", result);
            setNewWord(""); // รีเซ็ต input
            setIsModalOpen(false); // ปิด Modal
            const fetchedWords = await fetchWords(); // โหลดคำใหม่
            setWords(fetchedWords?.data || []);
        } catch (error) {
            console.error("Failed to create word:", error);
        } finally {
            setLoading(false); // จบโหลด
        }
    };

    const handleDeleteWords = async () => {
        const selectedIds = Object.keys(selectedWordsDelete).filter(
            (id) => selectedWordsDelete[id] // เอาเฉพาะคำที่ถูกเลือก
        );
        if (selectedIds.length === 0) return; // ไม่มีคำที่ถูกเลือก

        setLoading(true);
        try {
            await Promise.all(selectedIds.map((id) => deleteWord(id))); // ลบทุกคำที่เลือก
            const fetchedWords = await fetchWords(); // โหลดคำใหม่
            setWords(fetchedWords?.data || []);
            setSelectedWords({}); // รีเซ็ตคำที่เลือก
        } catch (error) {
            console.error("Failed to delete words:", error);
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false); // ปิด Modal
        }
    };

    const toggleCheckbox = (id, documentId) => {
        setSelectedWords((prev) => ({
            ...prev,
            [id]: !prev[id], // สลับสถานะ true/false
        }));
        setSelectedWordsDelete((prev) => ({
            ...prev,
            [documentId]: !prev[documentId], // สลับสถานะ true/false
        }));
    };

    useEffect(() => {
        const loadWords = async () => {
            try {
                setLoading(true);
                const fetchedWords = await fetchWords();
                setWords(fetchedWords?.data || []);
            } catch (error) {
                console.error("Failed to fetch words:", error);
            } finally {
                setLoading(false);
            }
        };

        loadWords();
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Header */}
            <div className="text-4xl text-white font-bold p-4">Speach Quiz</div>

            {/* Challenge Header */}
            <div className="flex flex-row items-center p-4 my-4 bg-slate-200 rounded-xl">
                <label
                    htmlFor="quizTitle"
                    className="text-base w-[20%] font-semibold mr-10"
                >
                    Quiz Title:
                </label>
                <input
                    id="quizTitle"
                    type="text"
                    placeholder="Enter quiz title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)} // อัปเดต quizTitle state
                    className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Main Content */}
            <div className="flex bg-slate-400 w-full h-full rounded-xl p-4">
                {/* Left Panel */}
                <div className="w-[50%] h-full bg-slate-100 p-4 overflow-y-auto rounded-xl">
                    {loading ? (
                        <p>Loading words...</p>
                    ) : (
                        words.map((wordItem) => (
                            <div
                                key={wordItem.id}
                                className="flex items-center justify-between p-2 border-b"
                            >
                                {/* Word */}
                                <WordCard word={wordItem.word} />
                                {/* Toggle Checkbox/Checkmark */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        toggleCheckbox(
                                            wordItem.id,
                                            wordItem.documentId
                                        )
                                    }
                                >
                                    {selectedWords[wordItem.id] ? (
                                        <span className="text-green-500 text-xl">
                                            ✔
                                        </span>
                                    ) : (
                                        <input type="checkbox" />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Panel */}
                <div className="flex flex-col w-[60%] h-full justify-end items-start p-20">
                    <div className="flex justify-between"></div>
                    <button
                        className="mb-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                        onClick={() => setIsModalOpen(true)} // เปิด Modal
                    >
                        + Add Word
                    </button>
                    <button
                        className="mb-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                        onClick={() => setIsDeleteModalOpen(true)} // เปิด Delete Modal
                    >
                        - Delete Word
                    </button>

                    <button
                        className="mb-2 px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 w-full"
                        onClick={handleCreateQuiz} // เรียกฟังก์ชันสร้าง Quiz
                        disabled={loading} // ปิดการกดปุ่มระหว่างโหลด
                    >
                        {loading ? "Creating..." : "Create Quiz"}
                    </button>
                </div>
            </div>

            {/* Add Word Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <div className="text-lg font-semibold mb-4">
                            Add New Word
                        </div>
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            placeholder="Enter a new word"
                            value={newWord}
                            onChange={(e) => setNewWord(e.target.value)} // อัปเดต newWord state
                        />
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)} // ปิด Modal
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded text-white ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                }`}
                                onClick={handleAddWord}
                                disabled={loading} // ปิดการกดปุ่มระหว่างโหลด
                            >
                                {loading ? "Adding..." : "Add Word"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <div className="text-lg font-semibold mb-4">
                            Confirm Deletion
                        </div>
                        <p className="mb-4">
                            Are you sure you want to delete the selected words?
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setIsDeleteModalOpen(false)} // ปิด Modal
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleDeleteWords} // ยืนยันการลบ
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpeachChallenge;
