import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { axData } from "../conf/ax";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { state, login } = authContext;
    const { isLoggedIn, role } = state; 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (isLoggedIn && role) {
            if (role === "USER" || role === "student") {
                navigate("/std"); 
            } else {
                navigate("/"); 
            }
        }
    }, [isLoggedIn, role, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);

        try {
            await login(username, password);
            if (axData?.jwt) {
                window.location.reload();
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex w-screen h-screen overflow-hidden bg-gray-900">
            {/* Left Panel - Video Background & Welcome Text */}
            <div className="relative hidden lg:flex flex-col justify-center w-[52%] h-full">
                {/* Looping video could go here; using a placeholder color for now */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90" />
                
                <div className="relative z-10 px-16 xl:px-24">
                    <h1 className="text-5xl xl:text-7xl font-display font-bold text-white leading-tight mb-6">
                        LMS<br />
                        <span className="font-serif italic text-gray-300">Thai Reading Platform</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-thai max-w-lg">
                        ยินดีต้อนรับสู่โปรแกรมฝึกการอ่านภาษาไทย ที่ออกแบบมาเพื่อพัฒนาทักษะของคุณอย่างมีประสิทธิภาพ
                    </p>
                </div>
            </div>

            {/* Right Panel - Login Form (Glassmorphism) */}
            <div className="flex w-full lg:w-[48%] h-full items-center justify-center p-8 z-10">
                <div className="glass-panel w-full max-w-md rounded-3xl p-10 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-thai font-bold text-white mb-2">เข้าสู่ระบบ</h2>
                        <p className="text-gray-300 font-thai text-sm">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-thai text-gray-200 mb-2">อีเมล (Email)</label>
                            <input
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent block p-4 font-thai placeholder-gray-400 transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-thai text-gray-200 mb-2">รหัสผ่าน (Password)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent block p-4 font-thai placeholder-gray-400 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm font-thai bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-white focus:ring-white/50 focus:ring-offset-gray-900"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm font-thai text-gray-300">
                                    จดจำฉันไว้
                                </label>
                            </div>
                            <a href="#" className="text-sm font-thai text-gray-300 hover:text-white transition-colors">
                                ลืมรหัสผ่าน?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`glass-button w-full font-thai font-bold text-white rounded-xl py-4 transition-all duration-300 ${
                                loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1"
                            }`}
                        >
                            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
