import React, { useState } from "react";
import { createCourse } from "../conf/api";

function CourseForm() {
    const [CourseName, setCourseName] = useState("");
    const [Description, setDescription] = useState("");

    const handleCreate = () => {
        createCourse(CourseName, Description);
    };

    return (
        <form className="w-[60%]" onSubmit={handleCreate}>
            <div class="space-y-12 bg-white p-14 rounded-2xl">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">
                        Add Your Course
                    </h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        This information will be displayed publicly.
                    </p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label
                                for="courseName"
                                class="block text-sm/6 font-medium text-gray-900"
                            >
                                Course Name
                            </label>
                            <div class="mt-2">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                                    <input
                                        type="text"
                                        name="courseName"
                                        id="courseName"
                                        onChange={(e) =>
                                            setCourseName(e.target.value)
                                        }
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        placeholder="001-002 ABCD"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label
                                for="about"
                                class="block text-sm/6 font-medium text-gray-900"
                            >
                                Description
                            </label>
                            <div class="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                                ></textarea>
                            </div>
                            <p class="mt-3 text-sm/6 text-gray-600">
                                Write a few sentences about this course.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 mb-14 flex items-center justify-end gap-x-6">
                <button
                    type="cancel"
                    class="text-sm/6 font-semibold text-gray-900 hover:underline  rounded-md  px-3 py-2 "
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default CourseForm;
