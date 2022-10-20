export default function changeGamesWon(gamesWon: number) {
    return { type: "CHANGE_GAMES_WON", payload: gamesWon };
}