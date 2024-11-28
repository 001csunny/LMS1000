import React, { useState } from "react";
import { createLesson } from "../../conf/api";

function LessonForm() {
    const [lessonName, setLessonName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newLesson = await createLesson(lessonName, description, file);
            console.log("Lesson created successfully:", newLesson);
        } catch (error) {
            console.error("Error creating lesson:", error);
        }
    };

    // ฟังก์ชันจัดการเมื่อมีการเลือกไฟล์
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-col mt-32 overflow-auto">
            <div className="space-y-12 bg-white p-14 rounded-2xl">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        Add Lesson
                    </h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        This information will be displayed publicly so be
                        careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="lessonName"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Lesson Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="lessonName"
                                    value={lessonName}
                                    onChange={(e) =>
                                        setLessonName(e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    placeholder="Lesson 1 get started"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows="3"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                ></textarea>
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">
                                Write a few sentences about this lesson.
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="file-upload"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Document
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg
                                        className="mx-auto size-12 text-gray-300"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="mt-4 flex text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange} // เมื่อเลือกไฟล์
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs/5 text-gray-600">
                                        PDF, PNG, JPG, GIF, etc up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-14 flex items-center justify-end gap-x-6">
                <button
                    type="cancel"
                    class="text-sm/6 font-semibold text-gray-900 hover:underline  rounded-md  px-3 py-2 "
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default LessonForm;
