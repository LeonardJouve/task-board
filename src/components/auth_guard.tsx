import React from "react";
import {Navigate} from "react-router-dom";
import useAuth from "@store/auth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({children}) => {
    const isLoggedIn = useAuth(({isLoggedIn}) => isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return children;
};

export default AuthGuard;
