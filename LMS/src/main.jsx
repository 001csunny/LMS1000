import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './index.jsx'
import Profile from './page/Profile.jsx'
import Home from './page/home.jsx'
import Course from './page/Course.jsx'
import Assigment from './page/Assigment.jsx'
import Login from './page/Login.jsx'

const routers = createBrowserRouter([
  {
    path: '/Index',
    element: <Index/>,
  },
  {
    path: '/Profile',
    element: <Profile/>,
  },
  {
    path: '/Home',
    element: <Index/>
  },
  {
    path: '/Course',
    element: <Course/>
  },
  {
    path: '/Assignment',
    element: <Assigment/>
  },
  {
    path: '/Login',
    element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>,
)
