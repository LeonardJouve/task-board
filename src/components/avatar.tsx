import React, {useEffect, useState} from "react";
import Rest from "@api/rest";
import type {User} from "@store/users";
import useUsers from "@store/users";
import Tooltip from "@components/tooltip";

export enum Size {
    S = 25,
    M = 40,
    L = 60,
}

type Props = {
    userId: User["id"];
    className?: string;
    size?: Size;
} & Pick<React.HtmlHTMLAttributes<HTMLDivElement>, "style">;

const Avatar: React.FC<Props> = ({userId, size = Size.M, style}) => {
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
        <Tooltip
            content={user.username}
            style={style}
        >
            <img
                className="rounded-[50%] border-slate-300 hover:border-slate-200 border-[1px]"
                src={hasError ? "src/public/assets/default_profile_picture.png" : Rest.getAssetsRoute(user.picture)}
                width={size}
                height={size}
                onError={handleError}
            />
        </Tooltip>
    );
};

export default Avatar;
