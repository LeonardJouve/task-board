import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);

    const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>): void => setPasswordConfirm(event.target.value);

    const handleSubmit = (): void => console.log("register");

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
                    <label className="flex flex-col gap-1">
                        <FormattedMessage
                            id="components.auth.passwordConfirm"
                            defaultMessage="Confirm password"
                        />
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                        />
                    </label>
                    <button type="submit">
                        <FormattedMessage
                            id="components.auth.register"
                            defaultMessage="Register"
                        />
                    </button>
                    <Link to="/login">
                        <FormattedMessage
                            id="components.auth.login"
                            defaultMessage="Login"
                        />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
