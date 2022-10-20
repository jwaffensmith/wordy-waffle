import { configureStore } from '@reduxjs/toolkit';
import gamesPlayed from './reducers/gamesPlayed';
import gamesWon from './reducers/gamesWon';
import guess from './reducers/guess';

// need to add dev tools config

export const store = configureStore({
  reducer: {
    gamesPlayed,
    gamesWon,
    guess
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {gamesPlayed}: gamesPlayedState, gamesWon: gamesWonState, guess: GuessState}
export type AppDispatch = typeof store.dispatch

export default store;