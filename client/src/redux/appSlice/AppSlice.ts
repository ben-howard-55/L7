import { createSlice } from '@reduxjs/toolkit';
import { fetchAppDataThunkReducers } from './thunks/fetchAppData';

const appSlice = createSlice({
  name: 'appState',
  initialState: {
    cards: [],
    calendar: [],
    cyclePosition: 0,
    hydrated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    fetchAppDataThunkReducers(builder);
  },
});

const { reducer } = appSlice;

export default reducer;
