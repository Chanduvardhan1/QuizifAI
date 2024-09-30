export const getRandomElements = (arr, count) => {
    let shuffled = arr.slice(0);
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled.slice(0, count);
}