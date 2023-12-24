import React from "react";
import {rgbToHex, type Color, isValidHex, hexToRgb} from "@utils/color";
import useTags, {getTagsColors} from "@store/tags";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const ColorPickerPreset: React.FC<Props> = ({color, setColor}) => {
    const {tags} = useTags();

    const handleSelect = (hex: string): void => {
        const sanitizedHex = hex.replace("#", "");
        if (!isValidHex(sanitizedHex)) {
            return;
        }

        setColor(hexToRgb(sanitizedHex));
    };

    const hex = rgbToHex(color);

    return (
        <div className="flex flex-row">
            {getTagsColors(tags).map((colorPreset) => (
                <button
                    key={`color-preset-${colorPreset}`}
                    className={`w-[25px] h-[25px] rounded-[50%] border-[1px] ${colorPreset === hex ? "border-color-1" : "border-transparent"}`}
                    onClick={(): void => handleSelect(colorPreset)}
                    style={{backgroundColor: colorPreset}}
                />
            ))}
        </div>
    );
};

export default ColorPickerPreset;
