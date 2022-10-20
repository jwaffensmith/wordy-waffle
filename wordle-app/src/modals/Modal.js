import { useEffect } from "react";
import getStats from "../helpers/getStats"

const Modal = ({gameStatus, totalTime, gamesWon, gamesPlayed, handleModalClose}) => {
    
    useEffect(() => {
        const closeModalWithEscapeKey = e => 
            e.key === "Escape" ? handleModalClose() : null
        document.body.addEventListener("keydown", closeModalWithEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeModalWithEscapeKey);
        }
    },[handleModalClose]);

    const winPercentage = getStats(gamesWon, gamesPlayed);

    return (
        <div className="flex justify-center font-sans">
        <div className="absolute inset-x-0 top-48 flex items-center justify-center">
            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                <div className="flex items-center justify-between">
                    <h5 className="px-3">Statistics</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 close-modal" 
                    fill="none"  viewBox="0 0 24 24" stroke="currentColor" onClick={handleModalClose}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                { gameStatus === "won" ? (
                    <div className="mt-3 p-5 mx-3">
                        <p className="mb-4 text-lg pt-3">Well done!</p>
                        <p>{totalTime}</p>
                        <p className="mb-4 text-sm">Time</p>
                        <p className="games-played">{gamesPlayed}</p>
                        <p className="mb-4 text-sm games-played">Played</p>
                        <p className="win-percent">{winPercentage}</p>
                        <p className="mb-4 text-sm win-percent">Win %</p>
                    </div>
                ) : (
                   null
                )}
                { gameStatus === "lost" ? (
                <div className="mt-3 p-5 mx-3">
                    <p className="mb-4 text-lg pt-3">Try Again Tomorrow</p>
                    <p>{totalTime}</p>
                    <p className="mb-4 text-sm">Time</p>
                    <p className="games-played">{gamesPlayed}</p>
                    <p className="mb-4 text-sm games-played">Played</p>
                    <p className="win-percent">{winPercentage}</p>
                    <p className="mb-4 text-sm win-percent">Win %</p>
                </div>
            ) : ( 
                null
            )}
            { gameStatus === "inProgress" ? (
            <div className="mt-3 p-5 mx-3">
                <p className="mb-4 text-lg pt-3">Game in Progress</p>
            </div>
                ) : ( 
                    null
                )}
            </div>
        </div>
    </div>
    )
}

export default Modal; 