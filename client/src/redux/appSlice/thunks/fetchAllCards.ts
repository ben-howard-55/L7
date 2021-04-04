import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Card } from '../../../api/client';
import state from '../AppState';

interface result {
  cards: Array<Card>;
}

export const fetchAllCards = createAsyncThunk<result, void>(
  'app/fetchAllCards',
  async () =>
    new Promise(async (resolve, reject) => {
      // fetch calendar, all users cards, cycle position
      const res = await client.getAllCards();

      if (res.status === 200) {
        resolve({
          cards: res.body,
        });
      } else {
        reject();
      }
    })
);

export const fetchAllCardsThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(fetchAllCards.fulfilled, (state, { payload }) => {
    payload.cards.forEach((c) => (state.cards[c.CardID] = c));
    state.hydratedCards = true;
  });

  builder.addCase(fetchAllCards.rejected, (state, { payload }) => {});
};
