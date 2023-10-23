import React from "react";
import type {User} from "@store/users";
import Avatar, {Size} from "@components/avatar";

type Props = {
    userIds: User["id"][];
    className?: string;
    amount?: number;
    size?: Size;
};

const Avatars: React.FC<Props> = ({userIds, className, size = Size.M, amount = 4}) => (
    <div className={`flex flex-row ${className}`}>
        {userIds.slice(0, amount).map((userId, i) => (
            <Avatar
                key={`avatar-${userId}`}
                userId={userId}
                size={size}
                className={`relative z-[${amount - i}]${i ? ` -left-[${Math.round(size / 2)}px]` : ""}`}
            />
        ))}
        {userIds.length > 0 && "..."}
    </div>
);

export default Avatars;
