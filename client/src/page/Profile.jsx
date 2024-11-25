import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Profile() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className="p-8 w-full h-full">
                <div className="text-5xl">Profile</div>
                <div className="flex w-full h-full bg-slate-500 p-10 rounded-3xl">
                    <div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-l-3xl">
                        <img
                            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                            alt=""
                            className="w-96 h-96 bg-slate-600 rounded-full"
                        />
                        <button
                            type="button"
                            class="mt-8 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Change your image here
                        </button>
                    </div>
                    <div className="flex flex-col  w-1/2 bg-slate-300 rounded-r-3xl p-10 space-y-4">
                        <div>Name</div>
                        <div>FFFFF LLLLLLLL</div>
                        <div>Email</div>
                        <div>asdfg@Email.com</div>
                        <div>Phone Number</div>
                        <div>0888888888</div>
                        <button
                            type="button"
                            class=" mt-8 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
