import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { axData } from "../conf/ax";

function Login() {
    const authContext = useContext(AuthContext);
    const { login } = authContext;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // สำหรับเก็บ error message
    const [loading, setLoading] = useState(false); // สำหรับจัดการ loading state

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // เคลียร์ error ก่อน
        setLoading(true); // ตั้งสถานะ loading

        try {
            // เรียกฟังก์ชัน login จาก AuthContext
            const response = await login(username, password);
            console.log("🚀 ~ handleLogin ~ response:", response)

            if (axData?.jwt) {
                console.log("Login Successful");
                window.location.replace("/"); // เปลี่ยนเส้นทางไปหน้าแรก
            } else {
                throw new Error("Invalid credentials"); // หากไม่มี token ให้โยน error
            }
        } catch (error) {
            console.error("Login Failed:", error.message);
            setError("Invalid email or password. Please try again."); // แสดงข้อความ error
        } finally {
            setLoading(false); // ปิดสถานะ loading
        }
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className="w-1/2 h-3/6">
                <form onSubmit={handleLogin} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@email.com"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-sm mb-5">{error}</div>
                    )}

                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading} // ป้องกันการกดซ้ำขณะกำลัง login
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                            loading
                                ? "opacity-50 cursor-not-allowed"
                                : "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        }`}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
