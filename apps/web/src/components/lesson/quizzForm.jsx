import React, { useState } from "react";
import { createQuizz } from "../../conf/api";

function QuizzForm({ closeModal, id, refreshData }) {
    const [quizName, setQuizName] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState("");
    const [pick, setPick] = useState(false); // Boolean for pick
    const [students, setStudents] = useState(""); // Comma-separated students
    const [file, setFile] = useState(null);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare form data
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                Quiz: quizName,
                description: description,
                Answer: answer || null, // ถ้าไม่มีคำตอบให้ส่ง null
                pick: pick, // ส่งเป็น boolean
                lesson: { id: id }, // lesson ต้องเป็น object ที่มี id
                students: students
                    ? students.split(",").map((id) => id.trim()) // แปลงเป็น array
                    : {}, // ส่ง array ว่างหากไม่มี
            })
        );

        if (file) {
            formData.append("files.file", file); // แนบไฟล์ถ้ามี
        }

        try {
            const newQuiz = await createQuizz(
                quizName,
                description,
                answer || null,
                pick,
                id,
                students ? students.split(",").map((id) => id.trim()) : [],
                file
            );

            console.log("Quiz created successfully:", newQuiz);

            if (newQuiz) {
                resetForm();
                refreshData();
                closeModal();
            }
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const resetForm = () => {
        setQuizName("");
        setDescription("");
        setAnswer("");
        setPick(false);
        // setStudents("");
        setFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-col mt-10 overflow-auto">
            <div className="space-y-8 bg-white p-10 rounded-2xl shadow-md">
                <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Add Quiz
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Provide details for the quiz question.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6">
                    {/* Quiz Name */}
                    <div>
                        <label
                            htmlFor="quizName"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Question
                        </label>
                        <input
                            type="text"
                            id="quizName"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your question here"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Provide a brief description for the question"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Describe the context of the quiz question.
                        </p>
                    </div>

                    {/* Answer Selection */}
                    <div>
                        <label
                            htmlFor="answer"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Correct Answer
                        </label>
                        <select
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select an answer
                            </option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>

                    {/* Pick */}
                    <div>
                        <label
                            htmlFor="pick"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Pick
                        </label>
                        <input
                            type="checkbox"
                            id="pick"
                            checked={pick}
                            onChange={(e) => setPick(e.target.checked)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Check if this is a pick question.
                        </p>
                    </div>

                    {/* Students */}
                    {/* <div>
                        <label
                            htmlFor="students"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Students
                        </label>
                        <input
                            type="text"
                            id="students"
                            value={students}
                            onChange={(e) => setStudents(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter student IDs, separated by commas"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Add students associated with this quiz (e.g.,
                            123,456,789).
                        </p>
                    </div> */}

                    {/* File Upload */}
                    <div>
                        <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Upload Supporting Document (Optional)
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Supported formats: PDF, PNG, JPG, etc. Max size:
                            10MB.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-sm font-medium text-gray-700 hover:underline"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default QuizzForm;
