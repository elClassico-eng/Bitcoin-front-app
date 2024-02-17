export function capitalazeFirstChar(str) {
    const firtsChar = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);

    const result = firtsChar + restOfString;

    return result;
}
