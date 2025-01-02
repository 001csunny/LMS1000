import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/AuthContext.jsx"; // Import the ContextProvider
import Profile from "./page/Profile.jsx";
import Course from "./page/Course.jsx";
import Assigment from "./page/Assigment.jsx";
import Login from "./page/Login.jsx";
import Index from "./page/index.jsx";
import Incourse from "./page/Incourse.jsx";
import Lesson from "./page/Lesson.jsx";
import ProtectedRoute from "./contexts/ProtectedRoute.jsx";
import StudentHome from "./components/student/studentHome.jsx";

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
                <Course />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Assignment",
        element: (
            <ProtectedRoute requiredRoles={["Teacher"]}>
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
        path: "/lesson/:id",
        element: (
            <ProtectedRoute >
                <Lesson />
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
