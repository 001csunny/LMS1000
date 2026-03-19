import React from "react";
import { Link } from "react-router-dom";

function QuizCard({ quizz, onCardClick, onEdit, onDelete }) {
    console.log("🚀 ~ QuizCard ~ quizz:", quizz)
    return (
        <div
            className="flex flex-row w-full h-14 bg-slate-100 px-10 justify-between items-center border-slate-200 border-y-[1px] cursor-pointer"
            // คลิกที่การ์ดจะเปิด Modal
        >
            {/* Quiz Question (Clickable Link) */}
            <Link
                // to={`/quiz/${quizId}`}
                className="hover:underline font-medium text-gray-900"
                onClick={onCardClick} 
            >
                {quizz.Quiz}
            </Link>
            <div className="text-sky-500 ">multiple choice</div>
            {/* Action Buttons */}
            <div className="flex gap-x-2">
                {/* Edit Button */}
                <button
                    type="button"
                    onClick={() => onEdit(quizz.id)} // Pass quizId to onEdit callback
                    className="text-yellow-400 py-1 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 text-center dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                >
                    Edit
                </button>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={() => onDelete(quizz.documentId)} // Pass quizId to onDelete callback
                    className="text-red-700 py-1 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuizCard;
