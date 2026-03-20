import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Input, Loading, MainLayout } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

/**
 * Login Page with modern UI and proper authentication flow
 */
function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        // Check if user is already logged in
        const token = sessionStorage.getItem('auth.jwt');
        const role = sessionStorage.getItem('userRole');
        
        if (token && role) {
            if (role === 'USER') {
                navigate("/"); 
            } else if (role === 'ADMIN') {
                navigate("/admin"); 
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);

        try {
            await login(email, password);
            
            // Redirect based on user role from sessionStorage
            const role = sessionStorage.getItem('userRole');
            if (role === 'ADMIN') {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout showNavbar={false}>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            เข้าสู่ระบบ
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            หรือ <a href="/public" className="font-medium text-blue-600 hover:text-blue-500">
                                ดูคอร์สสาธารณะ
                            </a> โดยไม่ต้องล็อกอิน
                        </p>
                    </div>

                    {/* Login Form */}
                    <Card>
                        <CardBody className="p-6">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                {error && (
                                    <div className="rounded-md bg-red-50 p-4 mb-4">
                                        <div className="text-sm text-red-800">
                                            {error}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <Input
                                        label="อีเมล"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin1@lms.local"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="รหัสผ่าน"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading || !email.trim() || !password.trim()}
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <Loading size="sm" />
                                                <span className="ml-2">กำลังเข้าสู่ระบบ...</span>
                                            </div>
                                        ) : (
                                            'เข้าสู่ระบบ'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>

                    {/* Demo Accounts */}
                    <Card variant="outlined">
                        <CardBody className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                บัญชีสำหรับทดสอบ
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="text-sm">
                                        <span className="font-medium">ผู้ดูแล:</span> admin1@lms.local / Admin@1234
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="text-sm">
                                        <span className="font-medium">ผู้ใช้ทั่วไป:</span> user1@lms.local / User@1234
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}

export default Login;
