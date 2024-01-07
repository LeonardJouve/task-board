import React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import useCards from "@store/cards";
import useUsers from "@store/users";
import useModals from "@store/modals";
import GenericModal from "@components/modals/generic_modal";
import EditableText from "@components/editable_text";
import BoardTag from "@components/board_tag";
import AddTagPopover from "@components/add_tag_popover";
import type {UpdateCard} from "@typing/rest";
import {ModalId, type Card} from "@typing/store";

type Props = {
    card: Card;
};

const BoardCardModal: React.FC<Props> = ({card}) => {
    const {formatMessage} = useIntl();
    const {updateCard, joinCard, leaveCard} = useCards();
    const {me} = useUsers();
    const {openModal} = useModals();

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


    const handleAskDeleteCard = (): void => openModal({
        id: ModalId.DELETE_BOARD_CARD,
        props: {cardId: card.id},
    });

    const isMeMember = card.userIds.includes(me.id);

    const name = (
        <EditableText
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
                <button
                    className="rounded background-dangerous-1 color-dangerous hover:background-dangerous-2 px-2 py-1 w-full"
                    onClick={handleAskDeleteCard}
                >
                    <FormattedMessage
                        id="components.board_card_modal.delete_card w-full"
                        defaultMessage="Delete card"
                    />
                </button>
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
            id={ModalId.BOARD_CARD}
            headerClassName="overflow-hidden"
            bodyClassName="overflow-scroll"
            header={name}
            content={content}
            showFooter={false}
        />
    );
};

export default BoardCardModal;
