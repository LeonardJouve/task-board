import React from "react";
import Profile from "@components/profile";
import ThemeSelector from "@components/theme_selector";
import BoardSelector from "@components/board_selector";

const Header: React.FC = () => (
    <div className="flex flex-row items-center px-5 py-3 border-color-1 border-b-[1px] background-1 color-1 font-extrabold">
        <BoardSelector/>
        <div className="flex flex-row justify-center items-center mr-0 ml-auto gap-2">
            <ThemeSelector/>
            <Profile/>
        </div>
    </div>
);

export default Header;
