import React, {useState} from "react";
import {useIntl} from "react-intl";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";
import useCards from "@store/cards";
import type {UpdateCard} from "@typing/rest";
import type {Card} from "@typing/store";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    cardId: Card["id"];
};

const BoardCardModal: React.FC<Props> = ({isOpen, setIsOpen, cardId}) => {
    const {formatMessage} = useIntl();
    const {cards, updateCard} = useCards();
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const card = cards[cardId];

    if (!card) {
        return null;
    }

    const handleUpdateCard = (updatedCard: UpdateCard): void => {
        updateCard(card.id, updatedCard);
    };

    const name = (
        <EditableText
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            content={card.name}
            placeholder={formatMessage({
                id: "components.default_card.name",
                defaultMessage: "Name",
            })}
            setContent={(updatedName): void => handleUpdateCard({name: updatedName})}
            isSingleLine={true}
            isEllipsis={true}
        />
    );

    const content = (
        <EditableText
            className="whitespace-break-spaces flex flex-1 overflow-scroll"
            isEditing={isEditingContent}
            setIsEditing={setIsEditingContent}
            content={card.content}
            placeholder={formatMessage({
                id: "components.default_card.content",
                defaultMessage: "Content",
            })}
            setContent={(updatedContent): void => handleUpdateCard({content: updatedContent})}
        />
    );

    return (
        <GenericModal
            headerClassName="overflow-hidden"
            bodyClassName="overflow-scroll"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            header={name}
            content={content}
            showFooter={false}
        />
    );
};

export default BoardCardModal;
