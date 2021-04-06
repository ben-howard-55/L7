import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Card } from '../../../api/client';
import AppState from '../../appSlice/AppState';
import state from '../GameState';

export const finishGame = createAsyncThunk<number, void>(
  'game/finishGame',
  async () =>
    new Promise(async (resolve, reject) => {
      const res = await client.updateCyclePosition();

      if (res.status === 200) {
        resolve(res.body);
      } else {
        reject();
      }
    })
);

export const finishGameThunkReducersApp = (builder: ActionReducerMapBuilder<AppState>) => {
  builder.addCase(finishGame.fulfilled, (state, { payload }) => {
    state.cyclePosition = payload;
  });

  builder.addCase(finishGame.rejected, (state, { payload }) => {});
};
