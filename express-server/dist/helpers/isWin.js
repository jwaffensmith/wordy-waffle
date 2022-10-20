"use strict";
const isWin = (guess, word) => {
    const wordGuess = guess.join('');
    const win = wordGuess === word;
    return win;
};
module.exports = isWin;
