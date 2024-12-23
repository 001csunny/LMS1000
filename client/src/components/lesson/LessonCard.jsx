import React, { useState } from "react";
import { Link } from "react-router-dom";

function LessonCard(props) {
    const userRole = sessionStorage.getItem("userRole");

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [randomCode, setRandomCode] = useState("");
    const [inputCode, setInputCode] = useState("");

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleDeleteClick = () => {
        const code = generateRandomCode();
        setRandomCode(code);
        setInputCode("");
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (inputCode === randomCode) {
            if (props.handleDeleteLesson) {
                props.handleDeleteLesson(props.documentId); // เรียกฟังก์ชันลบ
            }
            setIsConfirmModalOpen(false); // ปิด modal
        } else {
            alert("รหัสไม่ถูกต้อง!");
        }
    };

    if (!props.name || !props.description) {
        return null;
    }

    return (
        <div className="flex flex-row w-full h-14 bg-slate-100 px-10 justify-between items-center border-slate-200 border-y-[1px]">
            <Link
                to={`/lesson/${props.documentId}`}
                className="hover:underline"
            >
                {props.name}
            </Link>
            <div>{props.description}</div>
            {userRole === "Admin" || userRole === "Teacher" ? (
                <div>
                    <button
                        type="button"
                        onClick={handleDeleteClick}
                        className="text-red-700 py-1 mb-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        ลบบทเรียน
                    </button>
                </div>
            ) : null}

            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            กรุณากรอกรหัสยืนยันการลบ
                        </h2>
                        <p className="mb-4">
                            รหัสยืนยันของคุณคือ:{" "}
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
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => setIsConfirmModalOpen(false)}
                            >
                                ยกเลิก
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={handleConfirmDelete}
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

export default LessonCard;
