import React from "react";
import {rgbToHex, type Color} from "@utils/color";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const clamp = (min: number, max: number): number => Math.min(max, Math.max(min, 0));

const ColorPickerCustom: React.FC<Props> = ({color, setColor}) => {
    const hex = rgbToHex(color);

    const handleSaturationChange = (event: React.MouseEvent): void => {
        // const {
        //     width,
        //     height,
        //     left,
        //     top,
        // } = event.target.getBoundingClientRect();

        // const x = clamp(event.clientX - left, 0, width);
        // const y = clamp(event.clientY - top, 0, height);

        // const s = x / width * 100;
        // const v = 100 - y / height * 100;

        // setColor(rgbToHex(hsvToRgb({ h: parsedColor?.hsv.h, s, v })));
    };

    const handleHueChange = (event: React.MouseEvent): void => {
        //     const { width, left } = event.target.getBoundingClientRect();
        //     const x = clamp(event.clientX - left, 0, width);
        //     const h = Math.round((x / width) * 360);

        //     const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v };
        //     const rgb = hsvToRgb(hsv);

        //     onChange(rgbToHex(rgb));
    };

    return (
        <div>
            {/* <div
                className="bg-gradient-to-r from-white to-transparent"
                style={{backgroundColor: `hsl(${parsedColor.hsv.h}, 100%, 50%)`}}
                onClick={handleSaturationChange}
            >
                <div
                    style={{
                        backgroundColor: hex,
                        left: (satCoords?.[0] ?? 0) + "%",
                        top: (satCoords?.[1] ?? 0) + "%",
                    }}
                />
            </div>
            <div onClick={handleHueChange}>
                <div
                    style={{
                        backgroundColor: hex,
                        left: (hueCoords ?? 0) + "%",
                    }}
                />
            </div> */}
        </div>
    );
};

export default ColorPickerCustom;
