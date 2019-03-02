export const replaceAt = (string, replaceString, position) => {
    return string.substr(0, position.start) + replaceString + string.substr(position.end);
};
