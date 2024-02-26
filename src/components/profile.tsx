import React from "react";
import {useShallow} from "zustand/react/shallow";
import {useIntl} from "react-intl";
import useUsers from "@store/users";
import Avatar, {Size} from "@components/avatar";
import Menu, {MenuTrigger} from "@components/menu";
import useAuth from "@store/auth";
import type {ActionResult, Status} from "@typing/rest";

const Profile: React.FC = () => {
    const {formatMessage} = useIntl();
    const {me, fetchMe} = useUsers(useShallow(({me, fetchMe}) => ({me, fetchMe})));
    const logout = useAuth(({logout}) => logout);

    if (!me) {
        fetchMe();
        return null;
    }

    const handleDisconnect = async (): ActionResult<Status> => await logout();

    return (
        <Menu
            name="profile"
            placement="bottom-end"
            triggers={[MenuTrigger.CLICK, MenuTrigger.DISMISS]}
            button={(
                <button>
                    <Avatar
                        userId={me.id}
                        size={Size.S}
                        showTooltip={false}
                    />
                </button>
            )}
            items={[
                {
                    isDangerous: true,
                    leftDecorator: "leave",
                    text: formatMessage({
                        id: "components.profile_menu.disconnect",
                        defaultMessage: "Disconnect",
                    }),
                    onPress: handleDisconnect,
                },
            ]}
        />
    );
};

export default Profile;
