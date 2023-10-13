import React from "react";
import {useLocation} from "react-router-dom";
import Login from "@components/login";
import Register from "@components/register";

const Auth: React.FC = () => {
    const {pathname} = useLocation();

    console.log(location);
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col bg-slate-100 p-4">
                {pathname === "/register" ? <Register/> : <Login/>}
            </div>
        </div>
    );
};

export default Auth;
