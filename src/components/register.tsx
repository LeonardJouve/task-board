import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import useAuth from "@store/auth";
import useErrors from "@store/errors";

const Register: React.FC = () => {
    const {isLoggedIn, register} = useAuth();
    const {error, setError} = useErrors();
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => setName(event.target.value);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => setUsername(event.target.value);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);

    const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPasswordConfirm(event.target.value);

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        setError(null);
        register({name, username, email, password, passwordConfirm});
    };

    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }

    return (
        <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                    <FormattedMessage
                        id="components.auth.name"
                        defaultMessage="Name"
                    />
                    <input
                        className="rounded px-2 py-1 background-3 outline-none"
                        value={name}
                        onChange={handleNameChange}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <FormattedMessage
                        id="components.auth.username"
                        defaultMessage="Username"
                    />
                    <input
                        className="rounded px-2 py-1 background-3 outline-none"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </label>
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
                <label className="flex flex-col gap-1">
                    <FormattedMessage
                        id="components.auth.passwordConfirm"
                        defaultMessage="Confirm password"
                    />
                    <input
                        className="rounded px-2 py-1 background-3 outline-none"
                        type="password"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                </label>
            </div>
            {error ? (
                <span className="color-dangerous">
                    <FormattedMessage {...error.message}/>
                </span>
            ) : null}
            <button
                className="background-5 rounded px-2 py-1 color-2 hover"
                type="submit"
            >
                <FormattedMessage
                    id="components.auth.register"
                    defaultMessage="Register"
                />
            </button>
            <Link
                className="self-start hover:underline"
                to="/login"
            >
                <FormattedMessage
                    id="components.auth.login"
                    defaultMessage="Login"
                />
            </Link>
        </form>
    );
};

export default Register;
