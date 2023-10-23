import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import useCards, {type Card} from "@store/cards";
import GenericModal from "@components/modals/generic_modal";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    columnId: Card["columnId"];
};

const AddCardModal: React.FC<Props> = ({open, setOpen, columnId}) => {
    const [name, setName] = useState<Card["name"]>("");
    const [content, setContent] = useState<Card["content"]>("");
    const [tagIds, setTagIds] = useState<Card["tagIds"]>([]);
    const {createCard} = useCards();

    const handleConfirm = (): void => {
        console.log;
    };

    return (
        <GenericModal
            open={open}
            setOpen={setOpen}
            header={(
                <FormattedMessage
                    id="components.add_card_modal.header"
                    defaultMessage="Create a new card"
                />
            )}
            content={<></>}
            onConfirm={handleConfirm}
        />
    );
};

export default AddCardModal;
