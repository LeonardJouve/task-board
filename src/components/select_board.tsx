import React from "react";
import {useNavigate} from "react-router-dom";


const SelectBoard: React.FC = () => {
    const navigate = useNavigate();

    const openBoard = (): void => {
        navigate("/board/1");
    };

    return (
        <div className="flex flex-1 flex-col">
            <button onClick={openBoard}>
                {"go to board"}
            </button>
        </div>
    );
};

export default SelectBoard;
