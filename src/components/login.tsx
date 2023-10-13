import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {FormattedMessage, type MessageDescriptor} from "react-intl";
import Rest from "@api/rest";
import useAuth from "@store/auth";

const Login: React.FC = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<MessageDescriptor & {hasError: boolean}>({hasError: false});

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const {error: hasError, data} = await Rest.login(email, password);

        if (hasError) {
            setError({
                ...data,
                hasError,
            });
            return;
        }

        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col bg-slate-100 p-4">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label className="flex flex-col gap-1">
                        <FormattedMessage
                            id="components.auth.email"
                            defaultMessage="Email"
                        />
                        <input
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
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <button type="submit">
                        <FormattedMessage
                            id="components.auth.login"
                            defaultMessage="Login"
                        />
                    </button>
                    {error.hasError && (
                        <span className="text-red-500">
                            <FormattedMessage {...error}/>
                        </span>
                    )}
                </form>
                <Link to="/register">
                    <FormattedMessage
                        id="components.auth.register"
                        defaultMessage="Register"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Login;
