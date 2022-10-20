"use strict";
const checkGuess = (guess) => {
    const isWin = require('./isWin');
    const isLoss = require('./isLoss');
    const isWordValid = require('./isWordValid');
};
// function checkGuess() {
//     if (isWordValid(guess)) {
//         setGuessedWords([...guessedWords, guess.join('')]);
//         dispatch(changeGuess([]));
//         setRowIndex(rowIndex + 1);
//         virtualKeyboardClasses();
//         if (checkWin(guess, word)) {
//             setGameStatus("won");
//             dispatch(changeGamesPlayed(gamesPlayed + 1));
//             dispatch(changeGamesWon(gamesWon + 1));
//             setRowIndex(rowIndex + 1);
//             setTotalTime(calculateTotalTime(startGame))
//             setAlertMessage("Splendid");
//             setShowAlert(true);
//             setTimeout(handleAlertClose, 3000);
//             setShowModal(true);
//         } else if (checkLoss(guess, word, rowIndex)) {
//             setGameStatus("lost");
//             dispatch(changeGamesPlayed(gamesPlayed + 1));
//             setTotalTime(calculateTotalTime(startGame))
//             setAlertMessage(word);
//             setShowAlert(true);
//             setTimeout(handleAlertClose, 3000);
//             setShowModal(true);
//         }
//     } else {
//         setAlertMessage("Not in word list");
//         setShowAlert(true);
//         setTimeout(handleAlertClose, 2000);
//     }
// }
