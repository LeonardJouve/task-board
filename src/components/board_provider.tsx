import {useEffect, type FC, type PropsWithChildren} from "react";
import {useShallow} from "zustand/react/shallow";
import {useParams} from "react-router-dom";
import useBoards from "@store/boards";

export const BoardProvider: FC<PropsWithChildren> = ({children}) => {
    const params = useParams();
    const {currentBoardId, setCurrentBoardId} = useBoards(useShallow(({currentBoardId, setCurrentBoardId}) => ({currentBoardId, setCurrentBoardId})));

    useEffect((): (() => void)|void => {
        const boardId = Number(params["boardId"]) || null;

        if (boardId === currentBoardId) {
            return;
        }

        setCurrentBoardId(boardId);

        return (): void => setCurrentBoardId(null); // eslint-disable-line consistent-return
    }, [params, location]);

    return children;
};

export default BoardProvider;
