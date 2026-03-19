import React, { useState } from "react";

function ListWord({ words, setSelectedWordShow, onClose }) {
    const [tickWord, setTickWord] = useState([]); // State สำหรับเก็บคำที่ถูกเลือก

    const handleToggleCheckbox = (wordId) => {
        // ค้นหา word จาก words ที่มี id ตรงกับ wordId
        const toggledWord = words.find((word) => word.id === wordId);

        if (toggledWord) {
            setTickWord((prev) => {
                const isSelected = prev.some((word) => word.id === wordId); // ตรวจสอบว่าคำนี้ถูกเลือกอยู่หรือไม่

                if (isSelected) {
                    // ถ้าคำนี้ถูกเลือกอยู่แล้ว ให้ลบออก
                    return prev.filter((word) => word.id !== wordId);
                } else {
                    // ถ้าคำนี้ยังไม่ถูกเลือก ให้เพิ่มเข้าไป
                    return [...prev, toggledWord];
                }
            });
        }
    };

    const handleConfirmSelection = () => {
        // เพิ่มคำที่เลือกจาก tickWord ไปยัง selectedWordShow
        setSelectedWordShow((prevSelected) => [
            ...prevSelected,
            ...tickWord.filter(
                (word) =>
                    !prevSelected.some((prevWord) => prevWord.id === word.id) // ป้องกันคำซ้ำ
            ),
        ]);
        setTickWord([]); // เคลียร์คำที่เลือกหลังจากยืนยัน
    };

    return (
        <div>
            <div className="w-[100%] h-[70vh] bg-slate-100 p-4 overflow-y-auto rounded-xl">
                <div>
                    {(words || []).map((wordItem, index) => (
                        <div
                            key={wordItem.id || index} // ใช้ key สำรองถ้าไม่มี id
                            className="flex items-center justify-between p-2 border-b"
                        >
                            {/* แสดงข้อมูล Word */}
                            <div>{wordItem.word || "No word"}</div>

                            {/* แสดง Checkbox หรือ Checkmark */}
                            <div
                                className="cursor-pointer"
                                onClick={() =>
                                    handleToggleCheckbox(wordItem.id)
                                }
                            >
                                {tickWord.some(
                                    (word) => word.id === wordItem.id
                                ) ? (
                                    <span className="text-green-500 text-xl">
                                        ✔
                                    </span>
                                ) : (
                                    <input type="checkbox" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                        handleConfirmSelection(); // ยืนยันการเลือก
                        onClose(); // ปิด modal
                    }}
                >
                    ยืนยัน
                </button>
            </div>
        </div>
    );
}

export default ListWord;
