const virtualKeyboardClasses = (guess: string, word: string) => {
    let presentLetterArr = [];
    let correctLetterArr = [];
    let absentLetterArr = [];
    for (let i=0; i<guess.length; i++) {
        if (guess[i] === word[i]) {
            correctLetterArr.push(guess[i])
        } else if (guess[i] !== word[i] && word.includes(guess[i])) {
            presentLetterArr.push(guess[i])
        } else if (!word.includes(guess[i])) {
            absentLetterArr.push(guess[i])
            }
        }
        return [correctLetterArr, presentLetterArr, absentLetterArr]
}

module.exports = virtualKeyboardClasses;