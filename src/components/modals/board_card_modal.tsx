import React, {useState} from "react";
import type {Card} from "@store/cards";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    card: Card;
};

const BoardCardModal: React.FC<Props> = ({open, setOpen, card}) => {
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    const content = (
        <EditableText
            isEditing={isEditingContent}
            setIsEditing={setIsEditingContent}
            content={card.content}
            setContent={console.log}
        />
    );

    const header = (
        <EditableText
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            content={card.name}
            setContent={console.log}
        />
    );

    return (
        <GenericModal
            open={open}
            setOpen={setOpen}
            header={header}
            content={content}
            showFooter={false}
            closeOnClickOutside={true}
        />
    );
};

export default BoardCardModal;
