import useUsers from "@store/users";
import React from "react";

const Profile: React.FC = () => {
    const {me} = useUsers();

    return (
        <div>
            <img src={me.picture}/>
            <span>{me.username}</span>
        </div>
    );
};

export default Profile;
