import React, { useEffect, useState } from "react";
import WordCard from "../speach/WordCard";
import { createWord, fetchWords } from "../../conf/api";

function SpeachChallenge() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newWord, setNewWord] = useState("");
    const [challengeIds] = useState([]); // ตัวอย่าง Challenge IDs (แก้ไขตามจริง)
    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]); // เก็บสถานะ checkbox
    console.log("🚀 ~ SpeachChallenge ~ selectedWords:", selectedWords);

    const handleAddWord = async () => {
        if (!newWord.trim()) return; // ตรวจสอบว่ามีคำหรือไม่
        setLoading(true); // เริ่มโหลด
        try {
            const result = await createWord(newWord, challengeIds); // เรียก API สร้างคำใหม่
            console.log("Word created successfully:", result); // ล็อกข้อมูลคำที่สร้าง
            setNewWord(""); // รีเซ็ต input
            setIsModalOpen(false); // ปิด Modal

            // Fetch คำใหม่อีกครั้ง
            const fetchedWords = await fetchWords();
            setWords(fetchedWords?.data || []);
        } catch (error) {
            console.error("Failed to create word:", error);
        } finally {
            setLoading(false); // จบโหลด
        }
    };

    const toggleCheckbox = (documentId) => {
        setSelectedWords((prev) => ({
            ...prev,
            [documentId]: !prev[documentId], // สลับสถานะ true/false
        }));
    };

    useEffect(() => {
        const loadWords = async () => {
            try {
                setLoading(true);
                const fetchedWords = await fetchWords();
                setWords(fetchedWords?.data || []); // ใช้ `data` จาก API
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
            <div className="text-xl font-bold p-4">Form</div>

            {/* Challenge Header */}
            <div className="flex flex-row justify-between px-4">
                <div className="text-lg font-semibold">Challenge 1</div>
                <div className="text-lg">Quiz title</div>
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
                                documentId={wordItem.documentId}
                                className="flex items-center justify-between p-2 border-b"
                            >
                                {/* Word */}
                                <WordCard word={wordItem.word} />
                                {/* Toggle Checkbox/Checkmark */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        toggleCheckbox(wordItem.id)
                                    }
                                >
                                    {selectedWords[wordItem.documentId] ? (
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
                    <button
                        className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => setIsModalOpen(true)} // เปิด Modal
                    >
                        + Add Word
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        - Delete Word
                    </button>
                </div>
            </div>

            {/* Modal */}
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
        </div>
    );
}

export default SpeachChallenge;
