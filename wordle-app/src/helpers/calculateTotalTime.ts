//functions to caluclate and format total time played
function padTo2Digits(num: number): string {
    const digits = num.toString().padStart(2, '0')
    return digits;
    }

function calculateTotalTime(startGame: number): string {
    const endGameTimestamp = Date.now()
    const total = endGameTimestamp - startGame
    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

export default calculateTotalTime;