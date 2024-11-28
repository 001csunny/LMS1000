import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

import AssignmentCard from "../components/AssignmentCard";

function Assignment() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <div className="h-full w-full p-8">
                <div className="text-5xl mb-4">Assigment</div>
                <div className="flex w-full h-full bg-slate-500 p-10 rounded-3xl">
                    <div className="flex h-full w-full  px-4">
                        <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                            <button
                                type="button"
                                class="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                + Add Assignment
                            </button>
                            <button
                                type="button"
                                class="w-full  py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="w-full rounded-r-3xl bg-slate-100  pt-4">
                            <div className="text-xl ml-8 mb-2">
                                Total Assignments
                            </div>
                            <AssignmentCard />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Assignment;
