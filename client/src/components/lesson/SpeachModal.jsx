import React, { useEffect, useState, useRef } from "react";
import { fetchOneChallenge, textReader } from "../../conf/api";
import WordCard from "../speach/WordCard";

function SpeachModal({ selectedSpeach, closeModal }) {
    console.log("🚀 ~ SpeachModal ~ selectedSpeach:", selectedSpeach)
    const [challengeData, setChallengeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [isFlashing, setIsFlashing] = useState(false);
    const intervalRef = useRef(null); // ใช้ useRef เพื่อเก็บค่า interval
    const currentIndexRef = useRef(0); // ใช้ useRef เพื่อเก็บค่า currentIndex

    useEffect(() => {
        if (!selectedSpeach?.documentId) {
            console.warn("No documentId provided for selectedSpeach");
            return;
        }

        const fetchChallenge = async () => {
            setLoading(true);
            try {
                const data = await fetchOneChallenge(selectedSpeach.documentId);
                setChallengeData(data.data);
            } catch (error) {
                console.error("Error fetching challenge:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [selectedSpeach?.documentId]);

    // ฟังก์ชันสำหรับเล่นคำและการกระพริบ
    const playWordAndMoveToNext = () => {
        if (
            !challengeData?.words ||
            currentIndexRef.current >= challengeData.words.length
        ) {
            clearInterval(intervalRef.current); // หยุด interval เมื่อเล่นคำหมด
            setIsFlashing(false); // หยุดการกระพริบ
            return;
        }

        const wordItem = challengeData.words[currentIndexRef.current];
        textReader(wordItem.word).then((speechData) => {
            if (speechData && speechData.audioContent) {
                const audioContent = speechData.audioContent;
                const audio = new Audio(
                    "data:audio/wav;base64," + audioContent
                );

                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });

                audio.onended = () => {
                    // เมื่อเล่นคำสุดท้ายเสร็จ
                    if (
                        currentIndexRef.current ===
                        challengeData.words.length - 1
                    ) {
                        clearInterval(intervalRef.current); // หยุดการทำงานของ interval
                        setIsFlashing(false); // หยุดการกระพริบ
                    } else {
                        // เปลี่ยนคำถัดไป
                        currentIndexRef.current =
                            (currentIndexRef.current + 1) %
                            challengeData.words.length;
                        setHighlightedIndex(currentIndexRef.current);
                        setIsFlashing(true); // เริ่มการกระพริบคำใหม่
                    }
                };
            } else {
                console.error(
                    "No audioContent received for word:",
                    wordItem.word
                );
            }
        });
    };

    const handleReplay = () => {
        currentIndexRef.current = 0; // เริ่มจากคำแรก
        setHighlightedIndex(currentIndexRef.current);
        setIsFlashing(true);

        if (intervalRef.current) {
            clearInterval(intervalRef.current); // หยุด interval เก่า
        }

        intervalRef.current = setInterval(playWordAndMoveToNext, 3000); // เริ่ม interval ใหม่
    };

    useEffect(() => {
        if (challengeData?.words?.length > 0) {
            handleReplay(); // เริ่มเล่นเมื่อข้อมูล challengeData ถูกโหลด
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // ทำการลบ interval เมื่อคอมโพเนนต์ถูกทำลาย
            }
        };
    }, [challengeData]);

    return (
        <div className="relative w-full p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {selectedSpeach?.challenge || "Speech Challenge"}
                </h2>
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-black"
                >
                    ✕
                </button>
            </div>
            {loading ? (
                <div className="mt-4 text-gray-500">Loading...</div>
            ) : challengeData ? (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {challengeData.words
                        ?.slice(0, 16)
                        .map((wordItem, index) => (
                            <div
                                key={wordItem.id}
                                className={`flex items-center justify-between p-2 border-b transition-all duration-500 ${
                                    index === highlightedIndex && isFlashing
                                        ? "bg-yellow-300 text-red-500 animate-pulse"
                                        : ""
                                }`}
                            >
                                <WordCard word={wordItem.word} />
                            </div>
                        ))}
                </div>
            ) : (
                <div className="mt-4 text-red-500">
                    Failed to load challenge
                </div>
            )}
            <div className="mt-4 text-center">
                <button
                    onClick={handleReplay}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    ฝึกซ้ำอีกครั้ง
                </button>
            </div>
        </div>
    );
}

export default SpeachModal;
