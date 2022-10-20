export default function changeGamesPlayed(gamesPlayed: number) {
    return { type: "CHANGE_GAMES_PLAYED", payload: gamesPlayed };
}