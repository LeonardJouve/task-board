import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import useColumns from "@store/columns";
import useTags, {getTagsInCards} from "@store/tags";
import useCards, {getCardsInColumn} from "@store/cards";
import GenericModal from "@components/modals/generic_modal";
import type {Column, Tag} from "@typing/store";
import Menu, {type Item} from "@components/menu";

type Props = {
    column: Column;
    filterTagId: Tag["id"]|null;
    setFilterTagId: (tagId: Tag["id"]|null) => void;
    handleNewCard: () => void;
};

const BoardColumnHeaderActions: React.FC<Props> = ({column, handleNewCard, filterTagId, setFilterTagId}) => {
    const {formatMessage} = useIntl();
    const {deleteColumn} = useColumns();
    const {cards} = useCards();
    const {tags} = useTags();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const handleAskDelete = (): void => setIsDeleteModalOpen(true);

    const handleDelete = (): void => {
        deleteColumn(column.id);
    };

    const handleFilterByTag = (tagId: Tag["id"]|null): void => {
        setFilterTagId(tagId);
    };

    const filterMenuSubItems = getTagsInCards(tags, getCardsInColumn(cards, column.id))
        .filter((tag) => tag.id !== filterTagId)
        .map<Item>(({name, id}) => ({
            text: name,
            onPress: () => handleFilterByTag(id),
        }));

    if (filterTagId) {
        filterMenuSubItems.unshift({
            leftDecorator: "delete",
            text: formatMessage({
                id: "components.board_column_menu.remove_filter",
                defaultMessage: "Remove filter",
            }),
            isDangerous: true,
            onPress: () => handleFilterByTag(null),
        });
    }

    const items: Item[] = [
        {
            leftDecorator: "delete",
            text: formatMessage({
                id: "components.board_column_menu.delete_column",
                defaultMessage: "Delete column",
            }),
            isDangerous: true,
            onPress: handleAskDelete,
        },
    ];

    if (filterMenuSubItems.length) {
        items.unshift({
            leftDecorator: "filter",
            text: formatMessage({
                id: "components.board_column_menu.fiter_by_tag",
                defaultMessage: "Filter by tag",
            }),
            subItems: filterMenuSubItems,
        });
    }

    return (
        <div className="flex flex-row gap-2 mr-0 ml-auto">
            <button
                className="rounded background-5 hover"
                onClick={handleNewCard}
            >
                <i className="icon-plus"/>
            </button>
            <Menu
                name={`board-column-header-menu-${column.id}`}
                placement="bottom-end"
                button={(
                    <button className="rounded background-5">
                        <i className="icon-list"/>
                    </button>
                )}
                items={items}
            />
            <GenericModal
                isDangerous={true}
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                header={(
                    <FormattedMessage
                        id="components.delete_column_modal.header"
                        defaultMessage="Delete column"
                    />
                )}
                content={(
                    <FormattedMessage
                        id="components.delete_column_modal.content"
                        defaultMessage="Do you really want to delete this column ? This will also delete all cards contained inside."
                    />
                )}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default BoardColumnHeaderActions;
