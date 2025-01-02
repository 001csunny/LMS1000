import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    // ดึง role จาก sessionStorage
    const userRole = sessionStorage.getItem("userRole");

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
