export function debounce(callback, delay) {
    let timeoutId;

    return (value) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(value);
        }, delay);
    };
};