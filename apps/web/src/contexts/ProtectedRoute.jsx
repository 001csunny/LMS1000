import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { state } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Use AuthContext state instead of sessionStorage
        if (!state.loading) {
            setUserRole(state.role);
            setIsLoading(false);
        }
    }, [state.loading, state.role]);

    // แสดง loading ขณะตรวจสอบสถานะ
    if (isLoading || state.loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
            </div>
        </div>;
    }

    // ถ้ายังไม่มี role ให้ redirect ไปที่หน้า Login
    if (!userRole) {
        return <Navigate to="/Login" replace />;
    }

    // ตรวจสอบว่าผู้ใช้มีสิทธิ์ตาม role ที่กำหนดหรือไม่
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return <Navigate to="/403" replace />; // เปลี่ยนเส้นทางไปหน้า "ไม่มีสิทธิ์"
    }

    // ถ้ามีสิทธิ์ให้แสดงหน้าที่กำหนด
    return children;
};

export default ProtectedRoute;
