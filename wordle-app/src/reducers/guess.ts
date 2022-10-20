import { AnyAction } from 'redux'

interface GuessState {
    guess: string[]
}

let initialState: GuessState  = {
    guess: [],
};

const guess = (state = initialState, action: AnyAction) => {

    switch (action.type) {
        case "CHANGE_GUESS":
            return { 
                ...state,
                guess: action.payload,
            };
        default:
            return state; 
    }
};

export default guess;