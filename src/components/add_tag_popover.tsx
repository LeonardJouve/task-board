import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {useParams} from "react-router-dom";
import Creatable from "react-select/creatable";
import type {ActionMeta, ClassNamesConfig, GroupBase, MultiValue, MultiValueProps, StylesConfig} from "react-select";
import useCards from "@store/cards";
import useTags, {getTagsInBoard, getTagsInCards} from "@store/tags";
import Popover from "@components/popover";
import type {Card, Tag} from "@typing/store";
import BoardTag from "./board_tag";

type Props = {
    cardId: Card["id"];
};

type SelectOption = {
    label: string;
    value: Tag["id"];
};

const RenderSelectMultiValue: React.FC<MultiValueProps<SelectOption, true, GroupBase<SelectOption>> & {cardId: Card["id"]}> = ({data, cardId}) => (
    <BoardTag
        tagId={data.value}
        isRemovable={true}
        cardId={cardId}
    />
);

const RenderSelectDropdownIndicator: React.FC = () => null;

const RenderSelectIndicatorSeparator: React.FC = () => null;

const classNames: ClassNamesConfig<SelectOption, true, GroupBase<SelectOption>> = {
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
};

const formatTag = ({name, id}: Tag): SelectOption => ({
    label: name,
    value: id,
});

const formatCreateLabel = (tag: string): React.ReactNode => (
    <FormattedMessage
        id="components.add_tag_popover.create_tag"
        defaultMessage='Create new tag "{tag}"'
        values={{
            tag,
        }}
    />
);

const AddTagPopover: React.FC<Props> = ({cardId}) => {
    const {cards, addCardTag, removeCardTag} = useCards();
    const {tags, fetchTags, createTag} = useTags();
    const params = useParams();
    const [values, setValues] = useState<SelectOption[]>([]);
    const boardId = Number(params["boardId"]);
    const card = cards[cardId];

    useEffect(() => {
        fetchTags([boardId]);
    }, []);

    useEffect(() => {
        if (!card) {
            return;
        }
        setValues(getTagsInCards(tags, [card]).map(formatTag));
    }, [card]);

    if (!card) {
        return null;
    }

    const handleChange = (_: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>): void => {
        switch (actionMeta.action) {
        case "select-option":
            if (!actionMeta.option) {
                break;
            }
            addCardTag(cardId, actionMeta.option.value);
            setValues([
                ...values,
                actionMeta.option,
            ]);
            break;
        case "remove-value": {
            removeCardTag(cardId, actionMeta.removedValue.value);
            const newValues = [...values];
            const index = newValues.findIndex((value) => value.value === actionMeta.removedValue.value);
            if (index === -1) {
                break;
            }
            newValues.splice(index, 1);
            setValues(newValues);
            break;
        }
        }
    };

    const handleCreateTag = async (name: string): Promise<void> => {
        const tag = await createTag({
            boardId,
            name,
        });

        if (!tag) {
            return;
        }

        addCardTag(cardId, tag.id);

        setValues([
            ...values,
            formatTag(tag),
        ]);
    };

    const options: SelectOption[] = getTagsInBoard(tags, boardId)
        .filter(({id}) => !card.tagIds.includes(id))
        .map(formatTag);

    const isValidNewOption = (input: string): boolean => input.length !== 0 && !options.some((option) => option.label === input);

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
                    MultiValue: (props) => (
                        <RenderSelectMultiValue
                            {...props}
                            cardId={cardId}
                        />
                    ),
                    DropdownIndicator: RenderSelectDropdownIndicator,
                    IndicatorSeparator: RenderSelectIndicatorSeparator,
                }}
            />
        </Popover>
    );
};

export default AddTagPopover;

