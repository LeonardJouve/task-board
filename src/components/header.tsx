import React from "react";
import Profile from "@components/profile";
import ThemeSelector from "@components/theme_selector";
import BoardSelector from "@components/board_selector";
import Favicon from "@icons/favicon.svg";

const Header: React.FC = () => (
    <div className="flex flex-row items-center px-5 py-3 border-color-1 border-b-[1px] background-1 color-1 font-extrabold">
        <div className="flex flex-row gap-2 flex-1">
            <img
                className="size-8"
                src={Favicon}
            />
            <BoardSelector/>
        </div>
        <div className="flex flex-row justify-center items-center mr-0 ml-auto gap-2">
            <ThemeSelector/>
            <Profile/>
        </div>
    </div>
);

export default Header;
