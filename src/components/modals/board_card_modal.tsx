import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";
import useCards from "@store/cards";
import useUsers from "@store/users";
import type {UpdateCard} from "@typing/rest";
import type {Card} from "@typing/store";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    cardId: Card["id"];
};

const BoardCardModal: React.FC<Props> = ({isOpen, setIsOpen, cardId}) => {
    const {formatMessage} = useIntl();
    const {cards, updateCard, joinCard, leaveCard, deleteCard} = useCards();
    const {me} = useUsers();
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const card = cards[cardId];

    if (!card || !me) {
        return null;
    }

    const handleUpdateCard = (updatedCard: UpdateCard): void => {
        updateCard(card.id, updatedCard);
    };

    const handleJoinCard = (): void => {
        joinCard(card.id);
    };

    const handleLeaveCard = (): void => {
        leaveCard(card.id);
    };

    const handleAskDeleteCard = (): void => setIsDeleteModalOpen(true);

    const handleDeleteCard = (): void => {
        deleteCard(card.id);
        setIsOpen(false);
    };

    const isMeMember = card.userIds.includes(me.id);

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
        <div className="flex flex-1">
            <div className="flex flex-1">
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
            </div>
            <div className="flex flex-col gap-2">
                <button
                    className="rounded background-5 hover px-2 py-1 w-full"
                    onClick={isMeMember ? handleJoinCard : handleLeaveCard}
                >
                    {isMeMember ? (
                        <FormattedMessage
                            id="components.board_card_modal.join"
                            defaultMessage="Join"
                        />
                    ) : (
                        <FormattedMessage
                            id="components.board_card_modal.leave"
                            defaultMessage="Leave"
                        />
                    )}
                </button>
                <button
                    className="rounded background-dangerous-1 color-dangerous hover:background-dangerous-2 px-2 py-1 w-full"
                    onClick={handleAskDeleteCard}
                >
                    <FormattedMessage
                        id="components.board_card_modal.delete_card w-full"
                        defaultMessage="Delete card"
                    />
                </button>
            </div>
        </div>
    );

    return (
        <>
            <GenericModal
                headerClassName="overflow-hidden"
                bodyClassName="overflow-scroll"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                header={name}
                content={content}
                showFooter={false}
            />
            <GenericModal
                isDangerous={true}
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
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
        </>
    );
};

export default BoardCardModal;
