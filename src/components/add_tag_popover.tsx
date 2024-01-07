import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import Creatable from "react-select/creatable";
import type {ActionMeta, ClassNamesConfig, GroupBase, MultiValue, MultiValueProps, StylesConfig} from "react-select";
import useCards, {getCard} from "@store/cards";
import useBoards from "@store/boards";
import useTags, {getTagsInCards, getTagsInCurrentBoard} from "@store/tags";
import Popover from "@components/popover";
import BoardTag from "@components/board_tag";
import ColorPicker from "@components/color_picker";
import {hexToRgb, type Color, rgbToHex} from "@utils/color";
import type {Card, Tag} from "@typing/store";

type Props = {
    cardId: Card["id"];
};

type SelectOption = {
    label: string;
    value: Tag["id"];
};

type SelectMultiValueProps = Pick<MultiValueProps<SelectOption, true, GroupBase<SelectOption>>, "data"> & {cardId: Card["id"]};

const RenderSelectMultiValue: React.FC<SelectMultiValueProps> = ({data, cardId}) => (
    <BoardTag
        tagId={data.value}
        isRemovable={true}
        cardId={cardId}
    />
);

const classNames: ClassNamesConfig<SelectOption, true, GroupBase<SelectOption>> = {
    container: () => "color-2",
    input: () => "color-2",
    menu: () => "background-3",
    option: (state) => state.isFocused ? "background-4" : "",
};

const styles: StylesConfig<SelectOption, true> = {
    control: (style) => ({
        ...style,
        width: "200px",
        border: 0,
        backgroundColor: "transparent",
        boxShadow: "0 0 0 transparent",
    }),
    menu: (style) => ({
        ...style,
        margin: 0,
    }),
    valueContainer: (style) => ({
        ...style,
        gap: 4,
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    dropdownIndicator: () => ({
        display: "none",
    }),
};

const formatTag = ({name, id}: Tag): SelectOption => ({
    label: name,
    value: id,
});

const AddTagPopover: React.FC<Props> = ({cardId}) => {
    const {currentBoardId} = useBoards();
    const {addCardTag, removeCardTag} = useCards();
    const card = useCards(getCard(cardId));
    const {defaultColor, fetchTags, createTag} = useTags();
    const tagsInCard = useTags(getTagsInCards(card ? [card] : []));
    const tagsInBoard = useTags(getTagsInCurrentBoard());
    const [color, setColor] = useState<Color>(hexToRgb(defaultColor));

    useEffect(() => {
        if (!currentBoardId) {
            return;
        }

        fetchTags([currentBoardId]);
    }, []);

    if (!currentBoardId || !card) {
        return null;
    }

    const handleChange = (_: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>): void => {
        switch (actionMeta.action) {
        case "select-option":
            if (!actionMeta.option) {
                break;
            }
            addCardTag(cardId, actionMeta.option.value);
            break;
        case "remove-value": {
            removeCardTag(cardId, actionMeta.removedValue.value);
            break;
        }
        }
    };

    const handleCreateTag = async (name: string): Promise<void> => {
        const tag = await createTag({
            boardId: currentBoardId,
            name,
            color: "#" + rgbToHex(color),
        });

        if (!tag) {
            return;
        }

        addCardTag(cardId, tag.id);
    };

    const formatCreateLabel = (name: string): React.ReactNode => (
        <div className="flex flex-row gap-2 flex-wrap">
            <FormattedMessage
                id="components.add_tag_popover.create_tag"
                defaultMessage="Create new tag {tag}"
                values={{
                    tag: <BoardTag tag={{
                        name,
                        color: "#" + rgbToHex(color),
                    }}/>,
                }}
            />
            <div onClick={(event: React.MouseEvent): void => event.stopPropagation()}>
                <Popover
                    anchor={(
                        <button className="background-5 rounded hover flex">
                            <i className="icon-palette"/>
                        </button>
                    )}
                    placement="left-start"
                    isClosable={true}
                >
                    <ColorPicker
                        color={color}
                        setColor={setColor}
                    />
                </Popover>
            </div>
        </div>
    );

    const isValidNewOption = (input: string): boolean => input.length !== 0 && !options.some((option) => option.label === input);

    const options: SelectOption[] = tagsInBoard.filter(({id}) => !card.tagIds.includes(id))
        .map(formatTag);

    const values = tagsInCard.map(formatTag);

    return (
        <Popover
            anchor={(
                <button className="rounded background-5 hover px-2 py-1 w-full">
                    <FormattedMessage
                        id="components.add_tag_popover.add_tag"
                        defaultMessage="Add tag"
                    />
                </button>
            )}
            placement="bottom-end"
        >
            <Creatable
                className="p-1 rounded outline-none"
                autoFocus={true}
                styles={styles}
                classNames={classNames}
                options={options}
                isMulti={true}
                isClearable={false}
                menuIsOpen={true}
                value={values}
                placeholder={(
                    <FormattedMessage
                        id="components.add_tag_popover.enter_tag"
                        defaultMessage="Enter a tag name"
                    />
                )}
                isValidNewOption={isValidNewOption}
                onChange={handleChange}
                onCreateOption={handleCreateTag}
                formatCreateLabel={formatCreateLabel}
                components={{
                    MultiValue: ({data}) => (
                        <RenderSelectMultiValue
                            data={data}
                            cardId={cardId}
                        />
                    ),
                }}
            />
        </Popover>
    );
};

export default AddTagPopover;

