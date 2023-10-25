import React from "react";
import Profile from "@components/profile";
import ThemeSelector from "@components/theme_selector";

const Header: React.FC = () => (
    <div className="min-w max-h-header flex flex-row items-center p-2 border-b-slate-200 border-b-[1px]">
        <h2 className="uppercase">
            {"header"}
        </h2>
        <div className="flex flex-row justify-center items-center mr-0 ml-auto">
            <ThemeSelector/>
            <Profile/>
        </div>
    </div>
);

export default Header;
