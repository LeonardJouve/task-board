import React, {useState} from "react";
import ColorPickerManual from "@components/color_picker_manual";
import ColorPickerPreset from "@components/color_picker_preset";
import type {Color} from "@utils/color";
import ColorPickerCustom from "./color_picker_custom";

type Props = {

};

const ColorPicker: React.FC<Props> = () => {
    const [color, setColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    return (
        <div>
            <ColorPickerPreset
                color={color}
                setColor={setColor}
            />
            <ColorPickerCustom
                color={color}
                setColor={setColor}
            />
            <ColorPickerManual
                color={color}
                setColor={setColor}
            />
        </div>
    );
};

export default ColorPicker;
