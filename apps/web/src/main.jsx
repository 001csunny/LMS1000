import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/AuthContext.jsx"; // Import the ContextProvider
import Profile from "./page/Profile.jsx";
import CourseManagement from "./page/Course.jsx";
import Assigment from "./page/Assigment.jsx";
import Login from "./page/Login.jsx";
import Index from "./page/index.jsx";
import Incourse from "./page/Incourse.jsx";
import LessonPlayerPage from "./page/LessonPlayerPage.jsx";
import ProtectedRoute from "./contexts/ProtectedRoute.jsx";
import StudentHome from "./components/student/studentHome.jsx";
import AdminDashboard from "./page/AdminDashboard.jsx";
import PublicCourses from "./page/PublicCourses.jsx";
import PublicCourseDetail from "./page/PublicCourseDetail.jsx";
import PublicLessonDetail from "./page/PublicLessonDetail.jsx";
import CourseDashboard from "./page/CourseDashboard.jsx";
const routers = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute >
                <Index />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/public",
        element: <PublicCourses />,
    },
    {
        path: "/public/courses/:id",
        element: <PublicCourseDetail />,
    },
    {
        path: "/public/lessons/:id",
        element: <PublicLessonDetail />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRoles={["ADMIN"]}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/STD",
        element: (
            <ProtectedRoute requiredRoles={["student"]}>
                <StudentHome />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Course",
        element: (
            <ProtectedRoute >
                <CourseManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <CourseDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Assignment",
        element: (
            <ProtectedRoute requiredRoles={["ADMIN"]}>
                <Assigment />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Course/:id",
        element: (
            <ProtectedRoute >
                <Incourse />
            </ProtectedRoute>
        ),
    },
    {
        path: "/lesson/:id/play",
        element: (
            <ProtectedRoute >
                <LessonPlayerPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <div>Not found 404</div>,
    },
    {
        path: "/403",
        element: <div>ไม่มีสิทธิ์เข้าถึงหน้านี้</div>,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={routers} />
        </ContextProvider>
    </StrictMode>
);
