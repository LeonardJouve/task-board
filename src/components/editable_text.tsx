import React, {useEffect, useRef, useState} from "react";

type Props = {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    content: string;
    setContent: (content: string) => void;
    contentClass?: string;
};

const EditableText: React.FC<Props> = ({isEditing, setIsEditing, content, setContent, contentClass = ""}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editingContent, setEditingContent] = useState<string>(content);

    useEffect(() => setEditingContent(content), [isEditing, content]);

    useEffect(() => {
        if (!textareaRef.current || !isEditing) {
            return;
        }
        textareaRef.current.selectionStart = content.length;
        textareaRef.current.selectionEnd = content.length;
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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => setEditingContent(e.target.value);

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                className="resize-none flex flex-1 rounded"
                value={editingContent}
                autoFocus={true}
                onBlur={handleBlur}
                onChange={handleInputChange}
            />
        );
    }

    return (
        <div
            className={`flex flex-1 ${contentClass}`}
            onClick={handleEdit}
        >
            {content}
        </div>
    );
};

export default EditableText;
