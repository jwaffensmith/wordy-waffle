const words = require('../data/words.json');

const isWordValid = (guess: string[]): boolean => {
    const wordGuess = guess.join('');
    return words.includes(wordGuess.toLowerCase()) 
}

module.exports = isWordValid;