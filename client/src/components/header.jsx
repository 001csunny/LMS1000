import React from "react";
import { axData } from "../conf/ax";

function Header() {
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
            <li className="mr-1">
                <a
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                    href="/Course"
                >
                    Course
                </a>
            </li>
            <li className="mr-1">
                <a
                    className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                    href="/Assignment"
                >
                    Assignment
                </a>
            </li>
            <li className="mr-1">
                {axData.jwt ? (
                    <a
                        className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        href="/Logout"
                    >
                        Logout
                    </a>
                ) : (
                    <a
                        className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                        href="/Login"
                    >
                        Login→
                    </a>
                )}
            </li>
        </ul>
    );
}

export default Header;
