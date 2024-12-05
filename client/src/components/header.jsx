import React from "react";

function Header() {
    // ดึง role จาก sessionStorage
    const userRole = sessionStorage.getItem("userRole");
    const handleLogout = async () => {
        await logout();
        console.log("User has been logged out!");
    };

    return (
        <ul className="flex border-b w-screen">
            <li className="-mb-px mr-1">
                <a
                    className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                    href="/"
                >
                    Home
                </a>
            </li>
            <li className="mr-1">
                <a
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                    href="/Profile"
                >
                    Profile
                </a>
            </li>

            {/* เฉพาะบทบาทที่อนุญาตให้เข้าถึง Course */}
            {userRole === "Admin" || userRole === "Teacher" ? (
                <li className="mr-1">
                    <a
                        className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        href="/Course"
                    >
                        Course
                    </a>
                    <a
                        className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                        href="/Assignment"
                    >
                        Assignment
                    </a>
                </li>
            ) : null}

            {/* เฉพาะบทบาทที่อนุญาตให้เข้าถึง Assignment */}
            {userRole === "Student" ? (
                <li className="mr-1">
                    <a
                        className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        href="/AssignmentStd"
                    >
                        Assignment
                    </a>
                </li>
            ) : null}

            {/* แสดงเมนู Login หรือ Logout */}
            <li className="mr-1">
                {userRole ? (
                    <a
                        onClick={handleLogout}
                        className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        href="/Login"
                    >
                        Logout
                    </a>
                ) : (
                    <a
                        className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                        href="/Login"
                    >
                        Login →
                    </a>
                )}
            </li>
        </ul>
    );
}

export default Header;
