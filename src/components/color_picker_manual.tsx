import React from "react";
import {hexToRgb, isValidHex, rgbToHex, type Color} from "@utils/color";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const ColorPickerManual: React.FC<Props> = ({color, setColor}) => {
    const hex = rgbToHex(color);

    const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;

        if (!isValidHex(value)) {
            return;
        }

        setColor(hexToRgb(value));
    };

    const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>, element: keyof Color): void => {
        setColor({
            ...color,
            [element]: parseInt(event.target.value),
        });
    };

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
                {Object.keys(color).map((element) => (
                    <div
                        className="flex flex-col gap-1"
                        key={`color-custom-element-${element}`}
                    >
                        <label>{element.toUpperCase()}</label>
                        <input
                            className="rounded w-[40px] p-1 background-1"
                            placeholder={element.toUpperCase()}
                            value={color[element as keyof Color]}
                            onChange={(event): void => handleRgbChange(event, element as keyof Color)}
                            inputMode="numeric" // TODO: following attributes not working
                            pattern="[0-9]*"
                            min={0}
                            max={0xFF}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPickerManual;
