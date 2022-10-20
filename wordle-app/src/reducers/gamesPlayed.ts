import { AnyAction } from 'redux'

interface GamesPlayedState {
    gamesPlayed: number
}

let initialState: GamesPlayedState  = {
    gamesPlayed: 0,
};

const gamesPlayed = (state = initialState, action: AnyAction) => {

    switch (action.type) {
        case "CHANGE_GAMES_PLAYED":
            return { 
                ...state,
                gamesPlayed: action.payload,
            };
        default:
            return state; 
    }
};

export default gamesPlayed;