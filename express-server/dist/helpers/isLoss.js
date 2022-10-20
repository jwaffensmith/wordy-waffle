"use strict";
const isLoss = (guess, rowIndex, word) => {
    const wordGuess = guess.join('');
    if (wordGuess !== word && rowIndex === 5) {
        return true;
    }
    return false;
};
module.exports = isLoss;
