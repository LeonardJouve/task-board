import React, {useEffect, useState} from "react";
import Rest from "@api/rest";
import type {User} from "@store/users";
import useUsers from "@store/users";

export enum Size {
    S = 25,
    M = 40,
    L = 60,
}

type Props = {
    userId: User["id"];
    className?: string;
    size?: Size;
};

const Avatar: React.FC<Props> = ({userId, className, size = Size.M}) => {
    const {users, fetchUser} = useUsers();
    const [hasError, setHasError] = useState<boolean>(false);
    const user = users[userId];

    useEffect(() => {
        if (!userId) {
            return;
        }

        fetchUser(userId);
    }, [userId]);

    useEffect(() => {
        setHasError(false);
    }, [user]);

    const handleError = (): void => setHasError(true);

    if (!user) {
        return null;
    }

    return (
        <img
            className={`rounded-[50%] border-slate-300 hover:border-slate-200 border-[1px] ${className ?? ""}`}
            src={hasError ? "src/public/assets/default_profile_picture.png" : Rest.getAssetsRoute(user.picture)}
            width={size}
            height={size}
            onError={handleError}
        />
    );
};

export default Avatar;
