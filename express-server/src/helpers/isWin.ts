const isWin = (guess: string[], word: string): boolean => {
    const wordGuess = guess.join('');
    const win = wordGuess === word;
    return win;
};

module.exports = isWin;