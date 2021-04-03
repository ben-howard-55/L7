import { createSlice } from '@reduxjs/toolkit';
import GameState from '../gameSlice/GameState';
import { fetchGameDataThunkReducers } from './thunks/fetchGameData';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    hydratedGameState: false,
    practiceList: [],
    currentCard: undefined,
    hasAnswered: false,
  } as GameState,
  reducers: {},
  extraReducers: (builder) => {
    fetchGameDataThunkReducers(builder);
  },
});

const { reducer } = gameSlice;

export default reducer;
