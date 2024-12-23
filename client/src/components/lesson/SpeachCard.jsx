import React, { useState } from "react";
import { Link } from "react-router-dom";

function SpeachCard({ quizz, onCardClick, onEdit, onDelete }) {
    const userRole = sessionStorage.getItem("userRole");

    // State สำหรับการสุ่มรหัสและการยืนยัน
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [randomCode, setRandomCode] = useState("");
    const [inputCode, setInputCode] = useState("");

    // ฟังก์ชันสำหรับสุ่มรหัส
    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase(); // สุ่มรหัส 6 ตัวอักษร
    };

    // ฟังก์ชันที่เรียกเมื่อกดปุ่ม "ลบ"
    const handleDeleteClick = () => {
        const code = generateRandomCode(); // สุ่มรหัส
        setRandomCode(code); // เก็บรหัสใน state
        setInputCode(""); // รีเซ็ตช่องกรอก
        setIsConfirmModalOpen(true); // เปิด modal
    };

    // ฟังก์ชันสำหรับยืนยันการลบ
    const handleConfirmDelete = () => {
        if (inputCode === randomCode) {
            onDelete(quizz.documentId); // เรียกฟังก์ชันลบเมื่อรหัสถูกต้อง
            setIsConfirmModalOpen(false); // ปิด modal
        } else {
            alert("รหัสไม่ถูกต้อง!"); // แจ้งเตือนเมื่อรหัสไม่ตรง
        }
    };

    return (
        <div className="flex flex-row w-full h-14 bg-slate-100 px-20 justify-between items-center border-slate-200 border-y-[1px] cursor-pointer">
            {/* Quiz Question (Clickable Link) */}
            <Link
                className="hover:underline font-medium text-gray-900"
                onClick={onCardClick}
            >
                {quizz.challenge || quizz.test || quizz.exam}
            </Link>
            {quizz.challenge && (
                <div className="text-fuchsia-500">แบบเรียน</div>
            )}
            {quizz.test && !quizz.challenge && (
                <div className="text-amber-300">แบบฝึก</div>
            )}
            {quizz.exam && !quizz.challenge && !quizz.test && (
                <div className="text-sky-500">แบบทดสอบ</div>
            )}
            {/* Action Buttons */}
            {userRole === "Admin" || userRole === "Teacher" ? (
                <div className="flex gap-x-2">
                    {/* Delete Button */}
                    <button
                        type="button"
                        onClick={handleDeleteClick} // เรียกใช้ handleDeleteClick
                        className="text-red-700 py-1 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        ลบ
                    </button>
                </div>
            ) : null}

            {/* Modal สำหรับยืนยันการลบ */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-start">
                        <h2 className="text-lg font-semibold mb-4">
                            กรุณากรอกรหัสยืนยันการลบ
                        </h2>
                        <p className="mb-4">
                            รหัสยืนยันการลบ:{" "}
                            <span className="font-bold text-red-500">
                                {randomCode}
                            </span>
                        </p>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="กรอกรหัสยืนยัน"
                            className="border rounded-lg p-2 mb-4 w-full"
                        />
                        <div className="flex justify-between gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => setIsConfirmModalOpen(false)} // ปิด modal
                            >
                                ยกเลิก
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={handleConfirmDelete} // เรียกใช้ handleConfirmDelete
                            >
                                ยืนยันการลบ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpeachCard;
