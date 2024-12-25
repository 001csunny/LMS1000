import React, { useState } from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
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
            if (props.handleDeleteCourse) {
                props.handleDeleteCourse(props.documentId); // เรียกฟังก์ชันลบ
            }
            setIsConfirmModalOpen(false); // ปิด modal
        } else {
            alert("รหัสไม่ถูกต้อง!");
        }
    };

    const studentCount = Array.isArray(props.student)
        ? props.student.length // ถ้าเป็นอาร์เรย์
        : props.student && Object.keys(props.student).length; // ถ้าเป็นออบเจกต์

    if (!props.name || !props.description || studentCount === undefined) {
        return null;
    }

    return (
        <div className="flex flex-row w-full h-14 bg-slate-100 px-10 justify-between items-center border-slate-200 border-y-[1px]">
            <Link to={`/Course/${props.documentId}`} className="hover:underline">
                {props.name}
            </Link>
            <div>{props.description}</div>
            {userRole === "Admin" || userRole === "Teacher" ? (
                <div>
                    <div>จำนวนนักเรียน: {studentCount}</div>
                    <button
                        type="button"
                        className="text-yellow-400 py-1 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                    >
                        ดูสถิติ
                    </button>
                    <button
                        type="button"
                        className="text-yellow-400 py-1 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                    >
                        แก้ไข
                    </button>
                    {/* ปุ่มลบ เพิ่มการเรียกใช้งาน handleDeleteClick */}
                    <button
                        type="button"
                        onClick={handleDeleteClick}
                        className="text-red-700 py-1 mb-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        ลบ
                    </button>
                </div>
            ) : null}

            {/* Modal การยืนยันการลบ */}
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

export default CourseCard;
