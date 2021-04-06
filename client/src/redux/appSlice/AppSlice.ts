import { createSlice } from '@reduxjs/toolkit';
import AppState from './AppState';
import { addCardThunkReducers } from './thunks/addCard';
import { fetchCalendarDataThunkReducers } from './thunks/fetchCalendarData';
import { fetchAllCardsThunkReducers } from './thunks/fetchAllCards';
import { removeCardThunkReducers } from './thunks/removeCard';
import { answerQuestionThunkReducersApp } from '../gameSlice/thunks/answerQuestion';
import { finishGameThunkReducersApp } from '../gameSlice/thunks/finishGame';

const appSlice = createSlice({
  name: 'appState',
  initialState: {
    cards: {},
    calendar: [],
    cyclePosition: 0,
    hydratedCalendar: false,
    hydratedCards: false,
  } as AppState,
  reducers: {},
  extraReducers: (builder) => {
    fetchCalendarDataThunkReducers(builder);
    addCardThunkReducers(builder);
    removeCardThunkReducers(builder);
    fetchAllCardsThunkReducers(builder);
    answerQuestionThunkReducersApp(builder);
    finishGameThunkReducersApp(builder);
  },
});

const { reducer } = appSlice;

export default reducer;
