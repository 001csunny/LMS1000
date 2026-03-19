import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { getCurrentUser, updateUser } from "../conf/api";

function Profile() {
    const [mydata, setMydata] = useState({}); 
    const [loading, setLoading] = useState(true); 
    const [isEditing, setIsEditing] = useState(false); 
    const [editData, setEditData] = useState({}); 

    const fetchProfile = async () => {
        try {
            const userData = await getCurrentUser(); 
            setMydata(userData); 

            setEditData({
                username: userData.username,
                email: userData.email,
                Speach: userData.speechToken, // Mapping to form field
            });

            if (userData.speechToken) {
                sessionStorage.setItem("gcToken", userData.speechToken);
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false); 
        }
    };

    const saveProfile = async () => {
        try {
            const updatedData = await updateUser(mydata.id, editData);
            setMydata(updatedData); 
            setIsEditing(false); 

            if (editData.Speach) {
                sessionStorage.setItem("gcToken", editData.Speach);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchProfile();
    }, []); 

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-xl font-thai text-gray-500">กำลังโหลด (Loading)...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen min-h-screen bg-gray-50 font-thai">
            <Header />
            <div className="p-4 md:p-8 w-full max-w-6xl mx-auto flex-1">
                <div className="text-3xl md:text-5xl font-display font-bold text-gray-800 mb-8">โปรไฟล์ (Profile)</div>
                
                {/* Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600 mb-2">{mydata.xp || 0}</span>
                        <span className="text-gray-500 font-medium">คะแนนความก้าวหน้า (XP)</span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-orange-500 mb-2">{mydata.streak || 0}</span>
                        <span className="text-gray-500 font-medium">สถิติต่อเนื่อง (Streak)</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full bg-white shadow-lg border border-gray-100 p-6 md:p-10 rounded-3xl space-y-6 md:space-y-0">
                    {/* Left Section: Profile Image */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-100">
                        <div className="relative">
                            <img
                                src="https://ui-avatars.com/api/?name=${mydata.username || 'User'}&background=random&size=256"
                                alt="Profile"
                                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-50 shadow-md"
                            />
                        </div>
                        <button
                            type="button"
                            className="mt-6 py-2.5 px-6 text-sm font-medium text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            เปลี่ยนรูปโปรไฟล์
                        </button>
                    </div>

                    {/* Right Section: User Details */}
                    <div className="flex flex-col w-full md:w-2/3 p-6 md:px-10 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">ชื่อผู้ใช้ (Username)</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={editData.username || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            ) : (
                                <div className="text-lg text-gray-800 font-medium">{mydata.username || "N/A"}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">อีเมล (Email)</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="email"
                                    value={editData.email || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            ) : (
                                <div className="text-lg text-gray-800 font-medium">{mydata.email || "N/A"}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Google Speech Token (สำหรับ API)
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="Speach"
                                    value={editData.Speach || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            ) : (
                                <div className="text-lg text-gray-800 font-mono text-sm break-all bg-gray-50 p-3 rounded-xl border border-gray-100 mt-1">
                                    {mydata.speechToken || "ยังไม่มีข้อมูล Token"}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 flex justify-end">
                            {isEditing ? (
                                <div className="flex space-x-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        type="button"
                                        className="flex-1 sm:flex-none py-3 px-6 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        ยกเลิก (Cancel)
                                    </button>
                                    <button
                                        onClick={saveProfile}
                                        type="button"
                                        className="flex-1 sm:flex-none py-3 px-6 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-colors"
                                    >
                                        บันทึกข้อมูล (Save)
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    type="button"
                                    className="w-full sm:w-auto py-3 px-8 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 shadow-sm transition-colors"
                                >
                                    แก้ไขโปรไฟล์ (Edit)
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
