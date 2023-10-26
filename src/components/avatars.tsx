import React from "react";
import {FormattedMessage} from "react-intl";
import type {User} from "@store/users";
import Avatar, {Size} from "@components/avatar";
import Tooltip from "@components/tooltip";

type Props = {
    userIds: User["id"][];
    className?: string;
    amount?: number;
    size?: Size;
};

const Avatars: React.FC<Props> = ({userIds, className = "", size = Size.M, amount = 4}) => (
    <div
        className={`flex flex-row ${className}`}
        style={{...userIds.length > 1 && {marginRight: -Math.round(size / 2)}}}
    >
        {userIds.slice(0, amount).map((userId, i) => (
            <Avatar
                key={`avatar-${userId}`}
                userId={userId}
                size={size}
                style={{
                    zIndex: amount - i,
                    ...i && {left: -Math.round(size / 2)},
                }}
            />
        ))}
        {userIds.length > amount && (
            <Tooltip
                content={(
                    <FormattedMessage
                        id="components.avatars.more"
                        defaultMessage="{amount} more"
                        values={{amount: userIds.length - amount}}
                    />
                )}
                style={{left: -Math.round(size / 2)}}
            >
                {"..."}
            </Tooltip>
        )}
    </div>
);

export default Avatars;
