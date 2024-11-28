import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./page/Profile.jsx";
import Course from "./page/Course.jsx";
import Assigment from "./page/Assigment.jsx";
import Login from "./page/Login.jsx";
import Index from "./page/index.jsx";
import { ContextProvider } from "./contexts/AuthContext.jsx"; // Import the ContextProvider
import Incourse from "./page/Incourse.jsx";

const routers = createBrowserRouter([
  {
    path: "/Index",
    element: <Index />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "",
    element: <Index />,
  },
  {
    path: "/Course",
    element: <Course />,
  },
  {
    path: "/Assignment",
    element: <Assigment />,
  },
  {
    path: "/Login",
    element: <Login />,
  },{
    path: "/Course/:id",
    element: <Incourse />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider> {/* Wrap the RouterProvider with ContextProvider */}
      <RouterProvider router={routers} />
    </ContextProvider>
  </StrictMode>
);
