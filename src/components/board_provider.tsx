import useBoards from "@store/boards";
import {useEffect, type FC, type PropsWithChildren} from "react";
import {useLocation, useParams} from "react-router-dom";

export const BoardProvider: FC<PropsWithChildren> = ({children}) => {
    const params = useParams();
    // const location = useLocation();
    const {currentBoardId, setCurrentBoardId} = useBoards();

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
