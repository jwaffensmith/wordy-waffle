const isLoss = (guess: string[], rowIndex: number, word: string): boolean => {
    const wordGuess = guess.join('');
    if (wordGuess !== word && rowIndex === 5) {
        return true;
    }
    return false;
}

module.exports = isLoss;