import React, {useState} from "react";
import {useShallow} from "zustand/react/shallow";
import {Link, Navigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import useAuth from "@store/auth";
import useErrors from "@store/errors";

const Login: React.FC = () => {
    const {isLoggedIn, login} = useAuth(useShallow(({isLoggedIn, login}) => ({isLoggedIn, login})));
    const {error, setError} = useErrors(useShallow(({error, setError}) => ({error, setError})));
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        setError(null);
        login({email, password});
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace={true}/>;
    }

    return (
        <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                    <FormattedMessage
                        id="components.auth.email"
                        defaultMessage="Email"
                    />
                    <input
                        className="rounded px-2 py-1 background-3 outline-none"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <FormattedMessage
                        id="components.auth.password"
                        defaultMessage="Password"
                    />
                    <input
                        className="rounded px-2 py-1 background-3 outline-none"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>
            <button
                className="background-5 rounded px-2 py-1 color-3 hover"
                type="submit"
            >
                <FormattedMessage
                    id="components.auth.login"
                    defaultMessage="Login"
                />
            </button>
            {error ? (
                <span className="color-dangerous background-dangerous-1 px-2 py-1 rounded">
                    <FormattedMessage {...error.message}/>
                </span>
            ) : null}
            <Link
                className="self-start hover:underline"
                to="/register"
            >
                <FormattedMessage
                    id="components.auth.register"
                    defaultMessage="Register"
                />
            </Link>
        </form>
    );
};

export default Login;
