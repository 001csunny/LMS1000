import React from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
    const userRole = sessionStorage.getItem("userRole");
    // ตรวจสอบว่า props.student มีค่าและนับจำนวน
    const studentCount = Array.isArray(props.student)
        ? props.student.length // ถ้าเป็นอาร์เรย์
        : props.student && Object.keys(props.student).length; // ถ้าเป็นออบเจกต์

    // เช็คว่ามี props.name หรือ props.description หรือ props.student
    if (!props.name || !props.description || studentCount === undefined) {
        return null; // ถ้าไม่มี props ที่จำเป็น ให้ไม่แสดงอะไร
    }

    return (
        <div className="flex flex-row w-full h-14 bg-slate-100 px-10 justify-between items-center border-slate-200 border-y-[1px]">
            <Link
                to={`/Course/${props.documentId}`}
                className="hover:underline"
            >
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
                    <button
                        type="button"
                        className="text-red-700 py-1 mb-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        ลบ
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default CourseCard;
