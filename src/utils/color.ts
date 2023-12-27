export type Color = {
    r: number;
    g: number;
    b: number;
};

export type TempColor = Record<keyof Color, string>;

export type Hsl = {
    hue: number;
    saturation: number;
    lightness: number;
};

export const rgbToHex = (color: Color): string => Object.keys(color).reduce((hex, element) => hex + (color[element as keyof Color] <= 0xF ? "0" : "") + color[element as keyof Color].toString(16).toUpperCase(), "");

export const isValidHex = (hex: string): boolean => /^[0-9A-F]{6}$/.test(hex);

export const isValidRgb = (color: Color): boolean => Object.values(color).every((value) => value >= 0 && value <= 0xFF);

export const isValidTempColor = (tempColor: TempColor): boolean => Object.values(tempColor).every((value) => value.split("").every((character) => character.charCodeAt(0) >= "0".charCodeAt(0) && character.charCodeAt(0) <= "9".charCodeAt(0)) && (!value.length || parseInt(value, 16) <= 0xFF && parseInt(value, 16) >= 0));

export const isValidTempHex = (tempHex: string): boolean => !(parseInt(tempHex, 16) > 0xFFFFFF) && tempHex.split("").every((character) => /[0-9A-F]/g.test(character));

export const getTempColor = (color: Color): TempColor => Object.entries(color)
    .reduce<TempColor>((previous, [key, value]) => {
        previous[key as keyof Color] = String(value);

        return previous;
    }, {
        r: "",
        g: "",
        b: "",
    });

export const rgbToHsl = (color: Color): Hsl => {
    const {r, g, b} = Object.entries(color).reduce((previous, [key, value]) => {
        previous[key as keyof Color] = value / 0xFF;

        return previous;
    }, {
        r: 0,
        g: 0,
        b: 0,
    });

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (max === min) {
        return {
            hue: 0,
            saturation: 0,
            lightness: Math.round(max * 100),
        };
    }

    const delta = max - min;
    const lightness = (max + min) / 2;
    const saturation = delta / (1 - Math.abs(2 * lightness - 1));

    let hue = 0;
    switch (max) {
    case r:
        hue = (g - b) / delta % 6;
        break;
    case g:
        hue = (b - r) / delta + 2;
        break;
    case b:
        hue = (r - g) / delta + 4;
        break;
    }

    return {
        hue: Math.round(hue * 60),
        saturation: Math.round(saturation * 100),
        lightness: Math.round(lightness * 100),
    };
};

export const hslToRgb = (hsl: Hsl): Color => {
    const {hue} = hsl;
    const {saturation, lightness} = Object.entries(hsl).reduce((previous, [key, value]) => {
        previous[key as keyof Hsl] = value / 100;

        return previous;
    }, {
        hue: 0,
        saturation: 0,
        lightness: 0,
    });

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(hue / 60 % 2 - 1));
    const m = lightness - c / 2;

    let color: Color;

    switch (true) {
    case hue < 60:
        color = {
            r: c,
            g: x,
            b: 0,
        };
        break;
    case hue < 120:
        color = {
            r: x,
            g: c,
            b: 0,
        };
        break;
    case hue < 180:
        color = {
            r: 0,
            g: c,
            b: x,
        };
        break;
    case hue < 240:
        color = {
            r: 0,
            g: x,
            b: c,
        };
        break;
    case hue < 300:
        color = {
            r: x,
            g: 0,
            b: c,
        };
        break;
    default:
        color = {
            r: c,
            g: 0,
            b: x,
        };
    }

    return Object.entries(color).reduce<Color>((previous, [key, value]) => {
        previous[key as keyof Color] = Math.round((value + m) * 0xFF);

        return previous;
    }, {
        r: 0,
        g: 0,
        b: 0,
    });
};

export const getColor = (tempColor: TempColor): Color => Object.entries(tempColor)
    .reduce<Color>((previous, [key, value]) => {
        previous[key as keyof TempColor] = parseInt(value);

        return previous;
    }, {
        r: 0,
        g: 0,
        b: 0,
    });

export const hexToRgb = (hex: string): Color => {
    if (!isValidHex(hex)) {
        return {
            r: 0,
            g: 0,
            b: 0,
        };
    }

    const value = parseInt(hex, 16);

    return {
        r: value >> 16 & 0xFF,
        g: value >> 8 & 0xFF,
        b: value & 0xFF,
    };
};

