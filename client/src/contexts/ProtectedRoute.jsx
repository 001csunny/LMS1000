import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    // ดึง role จาก sessionStorage
    const userRole = sessionStorage.getItem("userRole");
    const hasAccess = requiredRoles.includes(userRole);
    if (!userRole) {
        return <Navigate to="/Login" replace />;
    }

    // ถ้ามีสิทธิ์ให้แสดงหน้าที่กำหนด
    return children;
};

export default ProtectedRoute;
