import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import state from './state';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    toggle: false,
    loading: false,
  },
  reducers: {
    toggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

const { reducer } = stateSlice;

export const { toggle } = stateSlice.actions;

export default reducer;
