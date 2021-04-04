import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Card } from '../../../api/client';
import GameState from '../../gameSlice/GameState';
import AppState from '../AppState';
import state from '../AppState';

interface addCardProps {
  frontText: string;
  backText: string;
}

export const addCard = createAsyncThunk<Card, addCardProps>(
  'app/addCard',
  async ({ frontText, backText }) =>
    new Promise(async (resolve, reject) => {
      const res = await client.addCard(frontText, backText);

      if (res.status === 201) {
        resolve(res.body);
      } else {
        reject();
      }
    })
);

export const addCardThunkReducers = (builder: ActionReducerMapBuilder<AppState>) => {
  builder.addCase(addCard.fulfilled, (state, { payload }) => {
    state.cards = [...state.cards, payload];
  });

  builder.addCase(addCard.rejected, (state, { payload }) => {});
};

export const addCardThunkReducersGame = (builder: ActionReducerMapBuilder<GameState>) => {
  builder.addCase(addCard.fulfilled, (state, { payload }) => {
    state.practiceList.push(payload);
  });

  builder.addCase(addCard.rejected, (state, { payload }) => {});
};
