"use strict";
const words = require('../data/words.json');
const isWordValid = (guess) => {
    const wordGuess = guess.join('');
    return words.includes(wordGuess.toLowerCase());
};
module.exports = isWordValid;
