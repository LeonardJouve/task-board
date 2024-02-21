import React from "react";
import ColorPickerPreset from "@components/color_picker_preset";
import ColorPickerCustom from "@components/color_picker_custom";
import type {Color} from "@utils/color";

type Props = {
    color: Color;
    setColor: (color: Color) => void;
};

const ColorPicker: React.FC<Props> = ({color, setColor}) => (
    <div className="p-4 min-w-[250px]">
        <ColorPickerPreset
            color={color}
            setColor={setColor}
        />
        <ColorPickerCustom
            color={color}
            setColor={setColor}
        />
    </div>
);

export default ColorPicker;
