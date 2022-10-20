import ActiveRow  from "./rows/ActiveRow";
import InactiveRow from "./rows/InactiveRow";
import CompletedRows from "./rows/CompletedRows";

interface GameBoardProps {
    guessedWords: string[],
    rowIndex: number,
    guess: string[],
    gameStatus: string,
    showAlert: boolean
}
  
const GameBoard = ( {guessedWords, rowIndex, guess, gameStatus, showAlert}: GameBoardProps ) => {
    
    return (
        <div className="mx-1 flex justify-center" id="game-board-container">
            <div className="
            flex 
            justify-items-center 
            bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 
            mb-5 
            rounded-lg 
            drop-shadow-2xl
           ">
                <div className="
                grid grid-cols-5 
                justify-items-center 

                gap-x-4
                gap-y-2.5
                mx-9
                my-5

                md:gap-x-5
                md:gap-y-3
                md:mx-10
                md:my-5
                ">
                <CompletedRows guessedWords={guessedWords} />

                { rowIndex <= 5 && gameStatus !== "won" ?
                    (<ActiveRow guess={guess} showAlert={showAlert} />) : (null)
                }

                { gameStatus !== "won" ?
                (Array.from({length: 5 - guessedWords.length}).map((_, index) => {
                    return <InactiveRow key={index} />
                })) : 
                ((Array.from({length: 6 - guessedWords.length}).map((_, index) => {
                    return <InactiveRow key={index} />
                })))
                }
                </div> 
            </div>
        </div>
    )
};

export default GameBoard;