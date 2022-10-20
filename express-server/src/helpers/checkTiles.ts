const checkTiles = (guess: string, word: string) =>  {
    let checkLetter = []
    for (let i=0; i<guess.length; i++) {
        if (guess[i] === word[i]) {
            checkLetter.push("correct")
        } else if (guess[i] !== word[i] && word.includes(guess[i])) {
            checkLetter.push("present")
        } else if (!word.includes(guess[i])) {
            checkLetter.push("absent")
        } 
    }
    return checkLetter
};

module.exports = checkTiles;