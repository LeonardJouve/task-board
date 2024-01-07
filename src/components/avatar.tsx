import React, {useEffect, useState} from "react";
import Rest from "@api/rest";
import useUsers, {getUser} from "@store/users";
import Tooltip from "@components/tooltip";
import type {User} from "@typing/store";

export enum Size {
    S = 25,
    M = 40,
    L = 60,
}

type Props = {
    userId: User["id"];
    className?: string;
    size?: Size;
    showTooltip?: boolean;
} & Pick<React.HtmlHTMLAttributes<HTMLDivElement>, "style">;

const Avatar: React.FC<Props> = ({userId, style, size = Size.M, showTooltip = true}) => {
    const {fetchUser} = useUsers();
    const user = useUsers(getUser(userId));
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
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

    const avatar = (
        <img
            className="rounded-[50%] border-color-1 hover border-[1px]"
            src={hasError ? "src/public/assets/default_profile_picture.png" : Rest.getAssetsRoute(user.picture)}
            width={size}
            height={size}
            onError={handleError}
        />
    );

    return showTooltip ? (
        <Tooltip
            tip={user.username}
            style={style}
        >
            {avatar}
        </Tooltip>
    ) : avatar;
};

export default Avatar;
