import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { getCurrentUser, updateUser } from "../conf/api";

function Profile() {
    const [mydata, setMydata] = useState({}); // State to store user data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [isEditing, setIsEditing] = useState(false); // State for editing mode
    const [editData, setEditData] = useState({}); // State for editable data

    console.log("🚀 ~ Profile ~ mydata:", mydata);
    console.log("🚀 ~ Profile ~ editData:", editData);

    // Fetch user profile asynchronously
    const fetchProfile = async () => {
        try {
            const userData = await getCurrentUser(); // Await API response
            setMydata(userData); // Update state with fetched data

            // Initialize editable data
            setEditData({
                username: userData.username,
                email: userData.email,
                Speach: userData.Speach,
            });

            // Save Speach (gcToken) to sessionStorage
            if (userData.Speach) {
                sessionStorage.setItem("gcToken", userData.Speach);
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false); // Stop loading after fetching data
        }
    };

    // Update user profile
    const saveProfile = async () => {
        try {
            const updatedData = await updateUser(mydata.id, editData);
            setMydata(updatedData); // Update the main profile data
            setIsEditing(false); // Exit editing mode

            // Update gcToken in sessionStorage
            if (editData.Speach) {
                sessionStorage.setItem("gcToken", editData.Speach);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    // Load profile on component mount
    useEffect(() => {
        fetchProfile();
    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className="p-4 md:p-8 w-full h-full">
                <div className="text-2xl md:text-5xl">โปรไฟล์</div>
                <div className="flex flex-col md:flex-row w-full h-full bg-slate-500 p-6 md:p-10 rounded-3xl space-y-6 md:space-y-0">
                    {/* Left Section: Profile Image */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white rounded-3xl md:rounded-l-3xl p-6">
                        <img
                            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                            alt="Profile"
                            className="w-32 h-32 md:w-96 md:h-96 bg-slate-600 rounded-full"
                        />
                        <button
                            type="button"
                            className="mt-4 md:mt-8 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                        >
                            เปลี่ยนรูป
                        </button>
                    </div>

                    {/* Right Section: User Details */}
                    <div className="flex flex-col w-full md:w-1/2 bg-slate-300 rounded-3xl md:rounded-r-3xl p-6 md:p-10 space-y-4">
                        <div className="text-slate-500">ชื่อ</div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={editData.username || ""}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                        ) : (
                            <div>{mydata.username || "N/A"}</div>
                        )}

                        <div className="text-slate-500">อีเมล</div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="email"
                                value={editData.email || ""}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                        ) : (
                            <div>{mydata.email || "N/A"}</div>
                        )}

                        <div className="text-slate-500">
                            Google Speech Token
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="Speach"
                                value={editData.Speach || ""}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                        ) : (
                            <div>{mydata.Speach || "not have a token"}</div>
                        )}

                        {isEditing ? (
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    type="button"
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:ring-4 focus:ring-gray-100"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={saveProfile}
                                    type="button"
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                                >
                                    บันทึก
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                type="button"
                                className="mt-4 md:mt-8 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                            >
                                แก้ไข
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
