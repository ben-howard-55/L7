import { createSlice } from '@reduxjs/toolkit';
import { addCardThunkReducersGame } from '../appSlice/thunks/addCard';
import GameState from '../gameSlice/GameState';
import { answerQuestionThunkReducers } from './thunks/answerQuestion';
import { fetchGameDataThunkReducers } from './thunks/fetchGameData';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    hydratedGameState: false,
    practiceList: [],
    currentCard: undefined,
    hasAnswered: false,
  } as GameState,
  reducers: {
    reveal: (state) => {
      state.practiceList.pop();
      state.hasAnswered = true;
    },
    start: (state) => {
      state.currentCard = state.practiceList[state.practiceList.length - 1];
    },
  },
  extraReducers: (builder) => {
    fetchGameDataThunkReducers(builder);
    answerQuestionThunkReducers(builder);
    addCardThunkReducersGame(builder);
  },
});
export const { reveal, start } = gameSlice.actions;
const { reducer } = gameSlice;

export default reducer;
