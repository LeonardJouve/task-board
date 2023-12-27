import React, {useEffect, useState} from "react";
import ColorPickerCustomSlider from "@components/color_picker_custom_slider";
import {hslToRgb, rgbToHsl, type Color, type Hsl, rgbToHex} from "@utils/color";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const ColorPickerCustom: React.FC<Props> = ({color, setColor}) => {
    const [hsl, setHsl] = useState<Hsl>(rgbToHsl(color));
    const {
        hue,
        saturation,
        lightness,
    } = hsl;

    useEffect(() => {
        if (rgbToHex(hslToRgb(hsl)) === rgbToHex(color)) {
            return;
        }

        console.log("update", rgbToHsl(color));
        setHsl(rgbToHsl(color));
    }, [color]);

    const updateColor = (partialHsl: Partial<Hsl>): void => {
        const newHsl = {
            ...hsl,
            ...partialHsl,
        };

        console.log(partialHsl, newHsl, hslToRgb(newHsl), hsl);

        setHsl(newHsl);
        setColor(hslToRgb(newHsl));
    };

    return (
        <div className="flex flex-col gap-4 p-2">
            <ColorPickerCustomSlider
                sliderBackground="linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))"
                thumbBackground={`hsl(${hue}, 100%, 50%)`}
                percent={Math.round(hue / 3.6)}
                setPercent={(newHue): void => updateColor({hue: Math.round(newHue * 3.6)})}
            />
            <ColorPickerCustomSlider
                sliderBackground={`linear-gradient(to right,hsl(${hue},0%,50%),hsl(${hue},100%,50%))`}
                thumbBackground={`hsl(${hue}, ${saturation}%, 50%)`}
                percent={saturation}
                setPercent={(newSaturation): void => updateColor({saturation: newSaturation})}
            />
            <ColorPickerCustomSlider
                sliderBackground={`linear-gradient(to right,hsl(${hue},100%,0%),hsl(${hue},100%,50%),hsl(${hue},100%,100%))`} // TODO: fix gradient issue
                thumbBackground={`hsl(${hue}, 100%, ${lightness}%)`}
                percent={lightness}
                setPercent={(newLightness): void => updateColor({lightness: newLightness})}
            />
        </div>
    );
};

export default ColorPickerCustom;
