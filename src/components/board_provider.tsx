import {useEffect, type FC, type PropsWithChildren} from "react";
import {useShallow} from "zustand/react/shallow";
import {useParams} from "react-router-dom";
import useBoards from "@store/boards";

export const BoardProvider: FC<PropsWithChildren> = ({children}) => {
    const params = useParams();
    const {currentBoardId, setCurrentBoardId} = useBoards(useShallow(({currentBoardId, setCurrentBoardId}) => ({currentBoardId, setCurrentBoardId})));

    useEffect(() => {
        const boardId = Number(params["boardId"]) || null;

        if (boardId === currentBoardId) {
            return;
        }

        setCurrentBoardId(boardId);
    }, [params, location]);

    return children;
};

export default BoardProvider;
