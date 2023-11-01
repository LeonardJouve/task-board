import React, {useEffect, useRef, useState} from "react";
import {FormattedMessage} from "react-intl";
import Tooltip from "@components/tooltip";

type Props = {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    content: string;
    setContent: (content: string) => void;
    placeholder?: string;
    isSingleLine?: boolean;
    isEllipsis?: boolean;
    className?: string;
};

const EditableText: React.FC<Props> = ({isEditing, setIsEditing, content, setContent, placeholder, isSingleLine, isEllipsis, className = ""}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editingContent, setEditingContent] = useState<string>(content);

    useEffect(() => setEditingContent(content), [isEditing, content]);

    useEffect(() => {
        if (!textareaRef.current || !isEditing) {
            return;
        }
        textareaRef.current.setSelectionRange(content.length, content.length);
        textareaRef.current.scrollTo(textareaRef.current.scrollWidth, textareaRef.current.scrollHeight);
    }, [isEditing]);

    const handleEdit = (e: React.MouseEvent): void => {
        e.stopPropagation();
        if (e.detail !== 2) {
            return;
        }
        setIsEditing(true);
    };

    const handleBlur = (): void => {
        if (!isEditing) {
            return;
        }
        setIsEditing(false);
        setContent(editingContent);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let newContent = e.target.value;
        if (isSingleLine) {
            newContent = newContent.replace("\n", "");
        }
        setEditingContent(newContent);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (!isEditing || !textareaRef.current || e.code !== "Enter" || !isSingleLine && !e.ctrlKey) {
            return;
        }
        textareaRef.current.blur();
    };

    const handleTextareaClick = (e: React.MouseEvent): void => e.stopPropagation();

    const singleLineProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
        rows: 1,
        wrap: "off",
    };

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                className="flex flex-1 resize-none rounded overflow-x-hidden outline-none bg-transparent"
                value={editingContent}
                autoFocus={true}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                onClick={handleTextareaClick}
                placeholder={content || placeholder}
                {...isSingleLine && singleLineProps}
            />
        );
    }

    return (
        <Tooltip tip={(
            <FormattedMessage
                id="components.editable_text.tooltip"
                defaultMessage="Double click to edit"
            />
        )}>
            <span
                className={`cursor-text ${isEllipsis ? "overflow-hidden whitespace-nowrap text-ellipsis" : ""} ${className}`}
                onClick={handleEdit}
            >
                {content || placeholder}
            </span>
        </Tooltip>
    );
};

export default EditableText;
