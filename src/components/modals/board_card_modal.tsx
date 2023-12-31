import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import useCards from "@store/cards";
import useUsers from "@store/users";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";
import BoardTag from "@components/board_tag";
import AddTagPopover from "@components/add_tag_popover";
import type {UpdateCard} from "@typing/rest";
import type {Card} from "@typing/store";

type Props = {
    card: Card;
    button?: React.JSX.Element;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const BoardCardModal: React.FC<Props> = ({card, button, isOpen, setIsOpen}) => {
    const {formatMessage} = useIntl();
    const {updateCard, joinCard, leaveCard, deleteCard} = useCards();
    const {me} = useUsers();
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    if (!me) {
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
            <div className="flex flex-col gap-2 max-w-[30%]">
                <button
                    className="rounded background-5 hover px-2 py-1 w-full"
                    onClick={isMeMember ? handleLeaveCard : handleJoinCard}
                >
                    {isMeMember ? (
                        <FormattedMessage
                            id="components.board_card_modal.leave"
                            defaultMessage="Leave"
                        />
                    ) : (
                        <FormattedMessage
                            id="components.board_card_modal.join"
                            defaultMessage="Join"
                        />
                    )}
                </button>
                <AddTagPopover cardId={card.id}/>
                <GenericModal
                    button={(
                        <button className="rounded background-dangerous-1 color-dangerous hover:background-dangerous-2 px-2 py-1 w-full">
                            <FormattedMessage
                                id="components.board_card_modal.delete_card w-full"
                                defaultMessage="Delete card"
                            />
                        </button>
                    )}
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
                {card.tagIds.length ? (
                    <div className="w-full gap-2 flex flex-row flex-wrap">
                        {card.tagIds.map((tagId) => (
                            <BoardTag
                                key={`board-card-modal-tag-${tagId}`}
                                tagId={tagId}
                                isRemovable={true}
                                cardId={card.id}
                            />))}
                    </div>
                ) : null}
            </div>
        </div>
    );

    return (
        <GenericModal
            button={button}
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
