import React, { useEffect, useState } from "react";
import { fetchOneChallenge } from "../../conf/api";
import WordCard from "../speach/WordCard";

function SpeachModal({ selectedSpeach, closeModal }) {
    const [challengeData, setChallengeData] = useState(null); // State สำหรับเก็บข้อมูล Challenge
    console.log("🚀 ~ SpeachModal ~ challengeData:", challengeData)
    const [loading, setLoading] = useState(true); // State สำหรับแสดงสถานะการโหลด

    useEffect(() => {
        if (!selectedSpeach?.documentId) {
            console.warn("No documentId provided for selectedSpeach");
            return;
        }

        const fetchChallenge = async () => {
            setLoading(true); // เริ่มโหลด
            try {
                const data = await fetchOneChallenge(selectedSpeach.documentId); // ดึงข้อมูลจาก API
                console.log("🚀 ~ fetchChallenge ~ data:", data); // ตรวจสอบข้อมูลที่ดึงได้
                setChallengeData(data.data); // อัปเดต State
            } catch (error) {
                console.error("Error fetching challenge:", error);
            } finally {
                setLoading(false); // โหลดเสร็จ
            }
        };

        fetchChallenge();
    }, [selectedSpeach?.documentId]); // ดึงข้อมูลใหม่เมื่อ documentId เปลี่ยน

    return (
        <div className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
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
                <div className="mt-4">
                    <div className="">
                        {challengeData.words?.map((wordItem) => (
                            <div
                                key={wordItem.id}
                                className="flex items-center justify-between p-2 border-b"
                            >
                                {/* Word */}
                                <WordCard word={wordItem.word} />
                                {/* Toggle Checkbox/Checkmark */}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-4 text-red-500">
                    Failed to load challenge
                </div>
            )}
        </div>
    );
}

export default SpeachModal;
