import React from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Main from "@components/main";
import Login from "@components/login";
import Register from "@components/register";

const Rooter: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/",
            element: <Main/>,
        },
    ]);

    return <RouterProvider router={router}/>;
};

export default Rooter;
