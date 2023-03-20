import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import getLocalStorageKey from "./helpers/getLocalStorageKey";
import ModalPortal from "./modals/ModalPortal";
import AlertPortal from "./modals/AlertPortal";
import Modal from "./modals/Modal";
import Alert from "./modals/Alert";
import useEventListener from "./hooks/useEventListener"
import { useAppSelector, useAppDispatch } from './hooks'
import changeGuess from "./actionCreators/changeGuess";
import changeGamesWon from "./actionCreators/changeGamesWon";
import changeGamesPlayed from "./actionCreators/changeGamesPlayed";
import calculateTotalTime from "./helpers/calculateTotalTime";
import isCompleteGuess from "./helpers/isCompleteGuess";
import axios from 'axios';

const GameContainer = () => {
    
    const { guess } = useAppSelector(state => state.guess);
    const dispatch = useAppDispatch();
    const [ guessedWords, setGuessedWords ] = useState([]);
    const [ rowIndex, setRowIndex ] = useState(0);
    const [ checkGuess, setCheckGuess ] = useState(false);
    
    // add classes to virtual keyboard buttons
    const [ presentLetters, setPresentLetters ] = useState(' ');
    const [ absentLetters, setAbsentLetters ] = useState(' ');
    const [ correctLetters, setCorrectLetters ] = useState(' ');

    // game stats
    const [ gameStatus, setGameStatus ] = useState("");
    const { gamesWon } = useAppSelector(state => state.gamesWon);
    const { gamesPlayed } = useAppSelector(state => state.gamesPlayed);
    const [ startGame, setStartGame ] = useState(0);
    const [ totalTime, setTotalTime ] = useState("");

    // end of game modal
    const [ showModal, setShowModal ] = useState(false);
    const handleModalClose = () => setShowModal(false);

    // Alert Modal
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ showAlert, setShowAlert ] = useState(false);
    const handleAlertClose = () => setShowAlert(false);

    // localstorage getItem
    useEffect(() => {
        const key = getLocalStorageKey("wordsGuessed");
        const guessWordList = JSON.parse(localStorage.getItem(key));
        if (guessWordList) {
            setGuessedWords(guessWordList)
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("rowIndex");
        const row = JSON.parse(localStorage.getItem(key));
        if (row) {
            setRowIndex(row)
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("gameStatus");
        const status = localStorage.getItem(key);
        if (status) {
            setGameStatus(status);
            if (status) {
               setShowModal(true);
            }
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("wordsGuessed");
        const guessWordList = JSON.parse(localStorage.getItem(key));
        if (guessWordList) {
            setGuessedWords(guessWordList)
        }
    }, []);

    useEffect(() => {
        const correctLetterKey = getLocalStorageKey("correctLetters");
        const presentLetterKey = getLocalStorageKey("presentLetters");
        const absentLetterKey = getLocalStorageKey("absentLetters");
        const startGameKey = getLocalStorageKey("startGame");
        const totalTimeKey = getLocalStorageKey("totalTime");
        const correctLetterClass = localStorage.getItem(correctLetterKey);
        const presentLetterClass = localStorage.getItem(presentLetterKey);
        const absentLetterClass = localStorage.getItem(absentLetterKey);
        const startGameTimestamp = JSON.parse(localStorage.getItem(startGameKey));
        const totalTimeCalculation = JSON.parse(localStorage.getItem(totalTimeKey));
        const totalGames = JSON.parse(localStorage.getItem("gamesPlayed"));
        const totalWon = JSON.parse(localStorage.getItem("gamesWon"));
        if (correctLetterClass) {
            setCorrectLetters(correctLetterClass)
        } 
        if (presentLetterClass) {
            setPresentLetters(presentLetterClass)
        } 
        if (absentLetterClass) {
            setAbsentLetters(absentLetterClass)
        } if (startGameTimestamp) {
            setStartGame(startGameTimestamp)
        } if (totalTimeCalculation) {
            setTotalTime(totalTimeCalculation)
        }
        if (totalGames) {
            dispatch(changeGamesPlayed(totalGames));
        }
        if (totalWon) {
            dispatch(changeGamesWon(totalWon));
        }
        // eslint-disable-next-line
    }, []);

    // localstorage setItem
    useEffect(() => {
        const rowKey = getLocalStorageKey("rowIndex");
        const wordGuessKey = getLocalStorageKey("wordsGuessed");
        const statusKey = getLocalStorageKey("gameStatus");
        const presentLetterKey = getLocalStorageKey("presentLetters");
        const correctLetterKey = getLocalStorageKey("correctLetters");
        const absentLetterKey = getLocalStorageKey("absentLetters");
        const startGameKey = getLocalStorageKey("startGame");
        const totalTimeKey = getLocalStorageKey("totalTime");
        localStorage.setItem(`${rowKey}`, JSON.stringify(rowIndex));
        localStorage.setItem(`${wordGuessKey}`, JSON.stringify(guessedWords));
        localStorage.setItem(`${statusKey}`, gameStatus);
        localStorage.setItem(`${presentLetterKey}`, presentLetters);
        localStorage.setItem(`${correctLetterKey}`, correctLetters);
        localStorage.setItem(`${absentLetterKey}`, absentLetters);
        localStorage.setItem(`${startGameKey}`, JSON.stringify(startGame));
        localStorage.setItem(`${totalTimeKey}`, JSON.stringify(totalTime));
        localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
        localStorage.setItem("gamesWon", JSON.stringify(gamesWon));
	}, [rowIndex, guessedWords, gameStatus, presentLetters, correctLetters, absentLetters, startGame, totalTime, gamesPlayed, gamesWon]);

    // post request to check guess 
    useEffect(() => {
        if (checkGuess) {
            axios.post("/api/check-guess", { guess: guess, rowIndex: rowIndex })
            .then((res) => {
            if (res.data.isValid) {
                setGuessedWords([...guessedWords, guess.join('')]);
                dispatch(changeGuess([]));
                setRowIndex(rowIndex + 1);
                setCheckGuess(false)
                setCorrectLetters(`${correctLetters} ${res.data.correctLetters.join(' ')}`)
                setPresentLetters(`${presentLetters} ${res.data.presentLetters.join(' ')}`)
                setAbsentLetters(`${absentLetters} ${res.data.absentLetters.join(' ')}`)
                if (res.data.isWin) {
                    setGameStatus("won");
                    dispatch(changeGamesPlayed(gamesPlayed + 1));
                    dispatch(changeGamesWon(gamesWon + 1));
                    setRowIndex(rowIndex + 1);
                    setTotalTime(calculateTotalTime(startGame))
                    setAlertMessage("Splendid");
                    setShowAlert(true);
                    setTimeout(handleAlertClose, 3000);
                    setShowModal(true);
                    setCorrectLetters(`${correctLetters} ${res.data.correctLetters.join(' ')}`)
                    setPresentLetters(`${presentLetters} ${res.data.presentLetters.join(' ')}`)
                    setAbsentLetters(`${absentLetters} ${res.data.absentLetters.join(' ')}`)
                } else if (res.data.isLoss) {
                    setGameStatus("lost");
                    dispatch(changeGamesPlayed(gamesPlayed + 1));
                    setTotalTime(calculateTotalTime(startGame))
                    setAlertMessage(res.data.word);
                    setShowAlert(true);
                    setTimeout(handleAlertClose, 3000);
                    setShowModal(true);
                    setCorrectLetters(`${correctLetters} ${res.data.correctLetters.join(' ')}`)
                    setPresentLetters(`${presentLetters} ${res.data.presentLetters.join(' ')}`)
                    setAbsentLetters(`${absentLetters} ${res.data.absentLetters.join(' ')}`)
                }
            } else {
                setAlertMessage("Not in word list");
                setShowAlert(true);
                setTimeout(handleAlertClose, 2000); 
                setCheckGuess(false) 
            } 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        // eslint-disable-next-line
	}, [checkGuess]);
    
    // custom hook for transforming lowercase letter input from physical keyboard
    useEventListener("keydown", ({key}) => { 
        key = key.toUpperCase(); 
        onKeyPress(key) 
    });
    
    // check and store user input 
    const onKeyPress = button => {
        const isLetter = /^[A-Z]$/.test(button);
        const isBackspace = button === '{backspace}' 
        const isEnter = button === '{enter}'
        const gameInProgress = guess.length === 0 && rowIndex === 0;
        if (isLetter && gameInProgress) {
            setGameStatus("inProgress");
            const time = Date.now()
            setStartGame(time);
        } 
        if (isBackspace) {
            const updatedGuess = [...guess];
            updatedGuess.pop();
            dispatch(changeGuess([...updatedGuess]
            ));
        }  
        if (isLetter && !isCompleteGuess(guess)) {
            const payload = [...guess, button]
            dispatch(changeGuess(payload));
        }   
        if (!isCompleteGuess(guess) && isEnter && rowIndex < 6) {
            setAlertMessage("Not enough letters")
            setShowAlert(true);
            setTimeout(handleAlertClose, 2000);
        }
        if (isCompleteGuess(guess) && isEnter && rowIndex < 6) {
            setCheckGuess(true);
        }
    }

    return (
        <div>
            <main className="game-container">
                <GameBoard 
                guess={guess}
                guessedWords={guessedWords}
                rowIndex={rowIndex}
                gameStatus={gameStatus}
                showAlert={showAlert}
                />
                <div className="mx-1 md:mx-48">
                    <Keyboard
                    useEventListener={useEventListener}
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={true}
                    physicalKeyboardHighlightPress={true}
                    theme={"hg-theme-default hg-layout-default myTheme"}
                    layout={{ 
                        'default': [ 
                        'Q W E R T Y U I O P', 
                        'A S D F G H J K L',
                        '{enter} Z X C V B N M {backspace}', 
                        ]
                    }}
                    buttonTheme= {[
                        {
                            class: "correct",
                            buttons: correctLetters
                        },
                        {
                            class: "present",
                            buttons: presentLetters
                        },
                        {
                            class: "absent",
                            buttons: absentLetters
                        },
                    ]}
                    />
                </div>
            </main>
            {showModal ? (
                <ModalPortal>
                    <Modal totalTime={totalTime} gamesPlayed={gamesPlayed} gamesWon={gamesWon} gameStatus={gameStatus} handleModalClose={handleModalClose}/>
                </ModalPortal>
            ) : null}
            { showAlert ? (
                <AlertPortal>
                    <Alert alertMessage={alertMessage}/>
                </AlertPortal>
            ) : null}
        </div>
    )
}

export default GameContainer; 