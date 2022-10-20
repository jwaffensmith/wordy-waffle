const isCompleteGuess = (guess: string[]): boolean => {
    const completeGuess = guess.length === 5;
    return completeGuess;
};

export default isCompleteGuess;