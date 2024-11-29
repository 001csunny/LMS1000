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

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Index />, // หน้าแรกไม่ต้องล็อกอิน
    },
    {
        path: "/Login",
        element: <Login />, // หน้าล็อกอิน
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
            <ProtectedRoute>
                <Course />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Assignment",
        element: (
            <ProtectedRoute>
                <Assigment />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Course/:id",
        element: (
            <ProtectedRoute>
                <Incourse />
            </ProtectedRoute>
        ),
    },
    {
        path: "/lesson/:id",
        element: (
            <ProtectedRoute>
                <Lesson />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <div>Not found 404</div>,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={routers} />
        </ContextProvider>
    </StrictMode>
);
