import React from "react";
import useUsers from "@store/users";
import Avatar, {Size} from "@components/avatar";
import Menu, {MenuTrigger} from "@components/menu";

const Profile: React.FC = () => {
    const {me} = useUsers();

    if (!me) {
        return null;
    }

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
                {text: "test"},
            ]}
        />
    );
};

export default Profile;
