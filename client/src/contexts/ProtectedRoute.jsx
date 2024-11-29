import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { state } = useContext(AuthContext);

    // ตรวจสอบสถานะการล็อกอิน
    if ((state.token = null)) {
        return <Navigate to="/Login" replace />;
    }

    // ถ้าล็อกอินแล้วให้แสดงหน้าที่กำหนด
    return children;
};

export default ProtectedRoute;
