import React, {useEffect, useState} from "react";
import {hexToRgb, isValidHex, rgbToHex, isValidRgb, getTempColor, getColor, isValidTempColor, type Color, type TempColor} from "@utils/color";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const ColorPickerManual: React.FC<Props> = ({color, setColor}) => {
    const [tempColor, setTempColor] = useState<TempColor>(getTempColor(color));

    useEffect(() => setTempColor(getTempColor(color)), [color]);

    const handleTempColorChange = (newTempColor: TempColor): void => {
        if (!isValidTempColor(newTempColor)) {
            return;
        }

        setTempColor(newTempColor);
    };

    const handleColorChange = (newTempColor: TempColor): void => {
        const newColor = getColor(newTempColor);
        if (!isValidRgb(newColor)) {
            handleTempColorChange(newTempColor);
            return;
        }

        setColor(newColor);
    };

    const hex = rgbToHex(color);

    const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;

        if (!isValidHex(value)) {
            return;
        }

        setColor(hexToRgb(value));
    };

    const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>, element: keyof Color): void => handleColorChange({
        ...tempColor,
        [element]: event.target.value,
    });

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();

    return (
        <div className="flex flex-row gap-5 color-1">
            <div className="flex flex-row gap-3">
                <div
                    className="self-end w-[30px] h-[30px] rounded-[50%]"
                    style={{backgroundColor: hex}}
                />
                <div className="flex flex-col gap-1">
                    <label>{"Hex"}</label>
                    <input
                        className="rounded w-[80px] p-1 background-1"
                        placeholder="Hex"
                        value={hex}
                        onChange={handleHexChange}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-3">
                {Object.keys(tempColor).map((element) => (
                    <div
                        className="flex flex-col gap-1"
                        key={`color-custom-element-${element}`}
                    >
                        <label>{element.toUpperCase()}</label>
                        <input
                            className="rounded w-[40px] p-1 background-1"
                            placeholder={element.toUpperCase()}
                            onFocus={handleFocus}
                            value={tempColor[element as keyof Color]}
                            onChange={(event): void => handleRgbChange(event, element as keyof Color)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPickerManual;
