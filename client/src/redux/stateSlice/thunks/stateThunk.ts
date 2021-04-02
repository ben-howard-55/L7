import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../state';

export const stateThunk = createAsyncThunk('state/thunk', async (): Promise<boolean> => true);

export const stateThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(stateThunk.pending, (state, action) => {
    state.loading = true;
  });

  builder.addCase(stateThunk.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.toggle = payload;
  });
  builder.addCase(stateThunk.rejected, (state, action) => {
    state.loading = false;
  });
};
