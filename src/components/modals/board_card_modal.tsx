import React, {useState} from "react";
import type {UpdateCard} from "@api/rest";
import type {Card} from "@store/cards";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";
import useCards from "@store/cards";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    card: Card;
};

const BoardCardModal: React.FC<Props> = ({open, setOpen, card}) => {
    const {updateCard} = useCards();
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    const handleUpdateCard = (updatedCard: UpdateCard): void => {
        updateCard(card.id, updatedCard);
    };

    const content = (
        <EditableText
            isEditing={isEditingContent}
            setIsEditing={setIsEditingContent}
            content={card.content}
            setContent={(updatedContent): void => handleUpdateCard({content: updatedContent})}
        />
    );

    const name = (
        <EditableText
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            content={card.name}
            setContent={(updatedName): void => handleUpdateCard({name: updatedName})}
        />
    );

    return (
        <GenericModal
            open={open}
            setOpen={setOpen}
            header={name}
            content={content}
            showFooter={false}
            closeOnClickOutside={true}
        />
    );
};

export default BoardCardModal;
