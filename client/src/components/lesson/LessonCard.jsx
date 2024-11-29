import React from "react";
import { Link } from "react-router-dom";

function LessonCard(props) {
    // เช็คว่ามี props.name หรือ props.description หรือ props.student
    if (!props.name || !props.description) {
        return null; // ถ้าไม่มี props ที่จำเป็น ให้ไม่แสดงอะไร
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

            <div>
                <button
                    type="button"
                    className="text-yellow-400 py-1 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="text-red-700 py-1 mb-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default LessonCard;
