import React from "react";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import useUsers from "@store/users";
import Avatar, {Size} from "@components/avatar";
import Menu, {MenuTrigger} from "@components/menu";
import useAuth from "@store/auth";

const Profile: React.FC = () => {
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const me = useUsers(({me}) => me);
    const setIsLoggedIn = useAuth(({setIsLoggedIn}) => setIsLoggedIn);

    if (!me) {
        return null;
    }

    const handleDisconnect = (): void => {
        setIsLoggedIn(false);
        navigate("/");
    };

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
