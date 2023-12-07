import React, { type FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "../Pages/Login"
import Home from "../Pages/Home"
import Register from "../Pages/Register"
import Layout from "../components/Layout"
import AuthLayout from "../components/AuthLayout"
import Loggedin from "../Pages/Loggedin"
import { Navigate } from 'react-router-dom';

export const loggedIn = !!parseInt(localStorage.getItem("login") as string)

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            
            
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            },
            {
                path: "/auth/loggedin",
                element: <Loggedin />
            }
        ]
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

const App: React.FC = () => {
    return (<RouterProvider router={router} />)
    
}
export default App