import React from "react";
import {FormattedMessage} from "react-intl";
import useCards from "@store/cards";
import GenericModal from "@components/modals/generic_modal";
import {ModalId, type Card} from "@typing/store";

type Props = {
    cardId: Card["id"];
};

const DeleteBoardCardModal: React.FC<Props> = ({cardId}) => {
    const {deleteCard} = useCards();

    const handleDeleteCard = (): void => {
        deleteCard(cardId);
    };

    return (
        <GenericModal
            id={ModalId.DELETE_BOARD_CARD}
            isDangerous={true}
            header={(
                <FormattedMessage
                    id="components.delete_card_modal.header"
                    defaultMessage="Delete card"
                />
            )}
            content={(
                <FormattedMessage
                    id="components.delete_card_modal.content"
                    defaultMessage="Do you really want to delete this card ? This will also remove all members."
                />
            )}
            onConfirm={handleDeleteCard}
        />
    );
};

export default DeleteBoardCardModal;
