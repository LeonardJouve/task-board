export type Color = {
    r: number;
    g: number;
    b: number;
};

export const rgbToHex = (color: Color): string => Object.keys(color).reduce((hex, element) => hex + (color[element as keyof Color] <= 0xF ? "0" : "") + color[element as keyof Color].toString(16).toUpperCase(), "#");

export const isValidHex = (hex: string): boolean => /^#[0-9A-F]{6}$/.test(hex);

export const hexToRgb = (hex: string): Color => {
    if (!isValidHex(hex)) {
        return {
            r: 0,
            g: 0,
            b: 0,
        };
    }

    const value = parseInt(hex.replace("#", ""), 16);

    return {
        r: value >> 16 & 0xFF,
        g: value >> 8 & 0xFF,
        b: value & 0xFF,
    };
};

// type Coordinates = {
//     x: number;
//     y: number;
// };

// export const getSaturationCoordinates = (color: Color): Coordinates => {
//     const {s, v} = rgbToHsv(color);

//     return {
//         x: s,
//         y: 100 - v,
//     };
// };

// export const getHueCoordinates = (color: Color): number => {
//     const {h} = rgbToHsv(color);

//     return h / 360 * 100;
// };

// type HSV = {
//     h: number;
//     s: number;
//     v: number;
// }

// export const rgbToHsv = (color: Color): HSV => {
//     let {
//         r,
//         g,
//         b,
//     } = color;

//     r /= 0xFF;
//     g /= 0xFF;
//     b /= 0xFF;

//     const max = Math.max(r, g, b);
//     const d = max - Math.min(r, g, b);

//     const h = d
//         ? (max === r
//             ? (g - b) / d + (g < b ? 6 : 0)
//             : max === g
//                 ? 2 + (b - r) / d
//                 : 4 + (r - g) / d) * 60
//         : 0;
//     const s = max ? d / max * 100 : 0;
//     const v = max * 100;

//     return {
//         h,
//         s,
//         v,
//     };
// };

// export const hsvToRgb = (color: HSV): Color => {
//     let {
//         h,
//         s,
//         v,
//     } = color;
//     s /= 100;
//     v /= 100;

//     const i = ~~(h / 60);
//     const f = h / 60 - i;
//     const p = v * (1 - s);
//     const q = v * (1 - s * f);
//     const t = v * (1 - s * (1 - f));
//     const index = i % 6;

//     const r = Math.round([v, q, p, p, t, v][index] * 255);
//     const g = Math.round([t, v, v, q, p, p][index] * 255);
//     const b = Math.round([p, p, t, v, v, q][index] * 255);

//     return {
//         r,
//         g,
//         b,
//     };
// };
