import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../../api/client';
import state from '../appState';

interface removeCardProps {
  cardId: string;
}

export const removeCard = createAsyncThunk<void, removeCardProps>(
  'app/removeCard',
  async ({ cardId }) =>
    new Promise(async (resolve, reject) => {
      const res = await client.deleteCard(cardId);

      if (res.status === 301) {
        resolve();
      } else {
        reject();
      }
    })
);

export const removeCardThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(removeCard.fulfilled, (state, { payload, meta }) => {
    state.cards = state.cards.filter((c) => c.cardId !== meta.arg.cardId);
  });

  builder.addCase(removeCard.rejected, (state, { payload }) => {});
};
