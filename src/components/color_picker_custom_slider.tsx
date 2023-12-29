import React, {useCallback, useEffect, useRef} from "react";

type Props = {
    sliderBackground: string;
    thumbBackground: string;
    percent: number;
    setPercent: (percent: number) => void;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const ColorPickerCustomSlider: React.FC<Props> = ({sliderBackground, thumbBackground, percent, setPercent}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);

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

    const {width} = sliderRef.current?.getBoundingClientRect() ?? {width: 0};

    return (
        <div
            ref={sliderRef}
            className="relative w-full h-[8px] rounded px-[2px]"
            style={{background: sliderBackground}}
            onMouseDown={handleMouseDown}
        >
            <div
                ref={thumbRef}
                className="absolute w-5 h-5 border-2 border-color-1 rounded-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                    background: thumbBackground,
                    marginLeft: String(width / 100 * percent) + "px",
                }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default ColorPickerCustomSlider;
