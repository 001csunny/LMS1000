import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { getCurrentUser, updateUser } from "../conf/api";

function Profile() {
    const [mydata, setMydata] = useState({}); // State to store user data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [isEditing, setIsEditing] = useState(false); // State for editing mode
    const [editData, setEditData] = useState({}); // State for editable data
    console.log("🚀 ~ Profile ~ editData:", editData)

    // Fetch user profile asynchronously
    const fetchProfile = async () => {
        try {
            const userData = await getCurrentUser(); // Await API response
            setMydata(userData); // Update state with fetched data
            setEditData({username:userData.username,email:userData.email,speach:userData.speach}); // Initialize editable data
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
            <div className="p-8 w-full h-full">
                <div className="text-5xl">Profile</div>
                <div className="flex w-full h-full bg-slate-500 p-10 rounded-3xl">
                    {/* Left Section: Profile Image */}
                    <div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-l-3xl">
                        <img
                            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                            alt="Profile"
                            className="w-96 h-96 bg-slate-600 rounded-full"
                        />
                        <button
                            type="button"
                            className="mt-8 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                        >
                            Change your image here
                        </button>
                    </div>

                    {/* Right Section: User Details */}
                    <div className="flex flex-col w-1/2 bg-slate-300 rounded-r-3xl p-10 space-y-4">
                        <div className="text-slate-500">Name</div>
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

                        <div className="text-slate-500">Email</div>
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

                        <div className="text-slate-500">Google Speech Token</div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
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
                                    onClick={() => setIsEditing(false)} // Cancel editing
                                    type="button"
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:ring-4 focus:ring-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveProfile} // Save edited data
                                    type="button"
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)} // Enable editing
                                type="button"
                                className="mt-8 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                            >
                                Edit
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
