export default function changeGuess(guess: string[]) {
    return { type: "CHANGE_GUESS", payload: guess };
}