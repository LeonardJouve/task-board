import React from "react";
import {useIntl} from "react-intl";
import useModals from "@store/modals";
import useTags, {getTagsInCards} from "@store/tags";
import useCards, {getCardsInColumn} from "@store/cards";
import Menu, {type Item} from "@components/menu";
import {ModalId, type Column, type Tag} from "@typing/store";

type Props = {
    columnId: Column["id"];
    filterTagId: Tag["id"]|null;
    setFilterTagId: (tagId: Tag["id"]|null) => void;
    handleNewCard: () => void;
};

const BoardColumnHeaderActions: React.FC<Props> = ({columnId, handleNewCard, filterTagId, setFilterTagId}) => {
    const {formatMessage} = useIntl();
    const openModal = useModals(({openModal}) => openModal);
    const cardsInColumn = useCards(getCardsInColumn(columnId));
    const tagsInCards = useTags(getTagsInCards(cardsInColumn));

    const handleAskDelete = (): void => openModal({
        id: ModalId.DELETE_BOARD_COLUMN,
        props: {columnId},
    });

    const handleFilterByTag = (tagId: Tag["id"]|null): void => {
        setFilterTagId(tagId);
    };

    const filterMenuSubItems = tagsInCards.filter((tag) => tag.id !== filterTagId)
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
                name={`board-column-header-menu-${columnId}`}
                placement="bottom-end"
                button={(
                    <button className="rounded background-5">
                        <i className="icon-list"/>
                    </button>
                )}
                items={items}
            />
        </div>
    );
};

export default BoardColumnHeaderActions;
