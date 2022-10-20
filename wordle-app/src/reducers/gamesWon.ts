import { AnyAction } from 'redux'

interface GamesWonState {
    gamesWon: number
}

let initialState: GamesWonState  = {
    gamesWon: 0,
};

const gamesWon = (state = initialState, action: AnyAction) => {

    switch (action.type) {
        case "CHANGE_GAMES_WON":
            return { 
                ...state,
                gamesWon: action.payload,
            };
        default:
            return state; 
    }
};

export default gamesWon;