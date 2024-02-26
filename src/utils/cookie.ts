export const getCookie = (name: string): string|null => {
    const start = document.cookie.indexOf(name + "=");
    if (start === -1) {
        return null;
    }

    const [cookie] = document.cookie.substring(start + name.length + 1).split(";");

    return cookie ?? null;
};
