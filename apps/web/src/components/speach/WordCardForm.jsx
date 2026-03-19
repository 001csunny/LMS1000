import React, { useState } from "react";
import { createWord, textReader } from "../../conf/api";

function WordCardForm({ setSelectedWords }) {
    const [newWord, setNewWord] = useState("");
    console.log("🚀 ~ WordCardForm ~ newWord:", newWord);
    const [challengeIds] = useState([]);

    // Click handler to trigger text-to-speech
    // const handleClick = async (word) => {
    //     const speechData = await textReader(word);
    //     if (speechData) {
    //         const audioContent = speechData.audioContent;
    //         const audio = new Audio("data:audio/wav;base64," + audioContent); // Converting base64 audio to an audio element
    //         audio.play();
    //     }
    // };

    return (
        <div className="flex rounded-lg   bg-slate-300 w-72 p-1 justify-between items-center mb-4">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="กรุณาเพิ่มคำที่นี่"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)} // อัปเดต newWord state
                onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // ป้องกันการส่งฟอร์มโดยไม่ตั้งใจ
                        if (newWord.trim() !== "") {
                            try {
                                // เรียก createWord และรอ response
                                const response = await createWord(
                                    newWord,
                                    challengeIds
                                );
                                console.log(
                                    "🚀 ~ createWord response:",
                                    response
                                );

                                // ตรวจสอบ response ก่อนเพิ่มลงใน state
                                if (response) {
                                    setSelectedWords((prevWords) => [
                                        ...prevWords, // คำที่มีอยู่เดิม
                                        response.data, // คำใหม่จาก response
                                    ]);

                                    // ล้างค่า input เฉพาะเมื่อสร้างคำสำเร็จ
                                    setNewWord("");
                                }
                            } catch (error) {
                                console.error("Error adding word:", error);
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default WordCardForm;
