import React, {useEffect, useRef, useState} from "react";

type Props = {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    content: string;
    setContent: (content: string) => void;
    isSingleLine?: boolean;
    className?: string;
};

const EditableText: React.FC<Props> = ({isEditing, setIsEditing, content, setContent, isSingleLine, className = ""}) => {
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
        if (!isEditing || e.code !== "Enter" || !isSingleLine && !e.ctrlKey) {
            return;
        }
        setIsEditing(false);
    };

    const singleLineProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
        rows: 1,
        wrap: "off",
    };

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                className="resize-none rounded max-w-full overflow-hidden outline-none bg-transparent"
                value={editingContent}
                autoFocus={true}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                {...isSingleLine && singleLineProps}
            />
        );
    }

    return (
        <span
            className={className}
            onClick={handleEdit}
        >
            {content}
        </span>
    );
};

export default EditableText;
