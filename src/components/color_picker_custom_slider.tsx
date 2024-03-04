import React, {useCallback, useEffect, useRef, useState} from "react";

type Props = {
    sliderBackground: string;
    thumbBackground: string;
    percent: number;
    setPercent: (percent: number) => void;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const ColorPickerCustomSlider: React.FC<Props> = ({sliderBackground, thumbBackground, percent, setPercent}) => {
    const [marginLeft, setMarginLeft] = useState<string>("0px");
    const sliderRef = useRef<HTMLDivElement|null>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);

    const handleMarginLeft = useCallback((node: HTMLDivElement|null): void => {
        if (!node) {
            return;
        }

        sliderRef.current = node;

        const newMarginLeft = String(node.getBoundingClientRect().width / 100 * percent) + "px";

        if (newMarginLeft === marginLeft) {
            return;
        }

        setMarginLeft(newMarginLeft);
    }, [percent]);

    const updatePercent = useCallback((clientX: number): void => {
        if (!sliderRef.current) {
            return;
        }

        const {left, width} = sliderRef.current.getBoundingClientRect();

        const newPercent = Math.round(clamp((clientX - left) / width, 0, 1) * 100);

        if (percent === newPercent) {
            return;
        }

        setPercent(newPercent);
    }, [setPercent]);

    const handleMouseMove = useCallback(({clientX}: MouseEvent): void => {
        if (!isDragging.current) {
            return;
        }

        updatePercent(clientX);
    }, [updatePercent]);

    const handleMouseUp = (): void => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove]);

    const handleMouseDown = (event: React.MouseEvent): void => {
        isDragging.current = true;
        event.preventDefault();

        updatePercent(event.clientX);
    };

    return (
        <div
            ref={handleMarginLeft}
            className="relative w-full h-[8px] rounded px-[2px]"
            style={{background: sliderBackground}}
            onMouseDown={handleMouseDown}
        >
            <div
                ref={thumbRef}
                className="absolute size-5 border-2 border-color-1 rounded-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                    background: thumbBackground,
                    marginLeft,
                }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default ColorPickerCustomSlider;
