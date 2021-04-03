import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Card } from '../../../api/client';
import state from '../GameState';

interface result {
  cards: Array<Card>;
}

export const fetchGameData = createAsyncThunk<result, void>(
  'game/fetchGameData',
  async () =>
    new Promise(async (resolve, reject) => {
      const res = await client.getTodaysCards();

      if (res.status === 200) {
        resolve({
          cards: res.body,
        });
      } else {
        reject();
      }
    })
);

export const fetchGameDataThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(fetchGameData.fulfilled, (state, { payload }) => {
    state.hydratedGameState = true;
    state.practiceList = payload.cards;
  });

  builder.addCase(fetchGameData.rejected, (state, { payload }) => {});
};
