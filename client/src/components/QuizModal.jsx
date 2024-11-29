import React from "react";

const QuizModal = ({ quizData, lesson,closeModal }) => {
    return (
        <div
            id="quiz-modal"
            tabIndex={-1}
            aria-hidden="false"
            className="fixed bg-slate-500 bg-opacity-50 overflow-auto top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-end p-2">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    <h3 className="text-2xl font-semibold mb-4">
                        Quiz Details
                    </h3>

                    {/* Quiz Name */}
                    <div className="mb-4">
                        <strong className="text-lg">Quiz:</strong>
                        <p>{quizData?.Quiz || "Loading..."}</p>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <strong className="text-lg">Description:</strong>
                        <pre>
                            {quizData?.description ||
                                "No description available"}
                        </pre>
                    </div>

                    {/* Answer */}
                    <div className="mb-4">
                        <strong className="text-lg">Answer:</strong>
                        <p>{quizData?.Answer || "No answer set"}</p>
                    </div>

                    {/* Pick */}
                    {/* <div className="mb-4">
                        <strong className="text-lg">Pick:</strong>
                        <p>{quizData?.pick ? "Yes" : "No"}</p>
                    </div> */}

                    {/* Files */}
                    {quizData?.file && quizData.file.length > 0 && (
                        <div className="mb-4">
                            <strong className="text-lg">Files:</strong>
                            <ul>
                                {quizData.file.map((file, index) => (
                                    <li key={index}>
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            {file.name || "Download file"}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Lesson */}
                    <div className="mb-4">
                        <strong className="text-lg">Lesson:</strong>
                        <p>{lesson || "No lesson assigned"}</p>
                    </div>

                    {/* Created and Updated Times */}
                    <div className="flex gap-x-4 mb-4">
                        <div>
                            <strong>Created At:</strong>
                            <p>{quizData?.createdAt || "N/A"}</p>
                        </div>
                        <div>
                            <strong>Updated At:</strong>
                            <p>{quizData?.updatedAt || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;
