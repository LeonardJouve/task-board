import React, {useState} from "react";
import ColorPickerManual from "@components/color_picker_manual";
import ColorPickerPreset from "@components/color_picker_preset";
import ColorPickerCustom from "@components/color_picker_custom";
import type {Color} from "@utils/color";

type Props = {

};

const ColorPicker: React.FC<Props> = () => {
    const [color, setColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    return (
        <div className="p-4">
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
