import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../../api/client';
import AppState from '../../appSlice/AppState';
import GameState from '../GameState';

interface answerQuestionPayload {
  cardId: string;
  correct: boolean;
}

interface result {
  cardId: string;
  newLevel: number;
  cycle: number;
}

export const answerQuestion = createAsyncThunk<result, answerQuestionPayload>(
  'game/answerQuestion',
  async ({ cardId, correct }) =>
    new Promise(async (resolve, reject) => {
      const res = await client.updateLevel(cardId, correct);
      console.log(res);
      if (res.status === 200) {
        resolve({
          cardId: res.body.CardID,
          newLevel: res.body.Level,
          cycle: res.body.CycleLastSeen,
        });
      } else {
        reject();
      }
    })
);

export const answerQuestionThunkReducers = (builder: ActionReducerMapBuilder<GameState>) => {
  builder.addCase(answerQuestion.fulfilled, (state, { payload }) => {
    state.hasAnswered = false;
    state.currentCard = state.practiceList[state.practiceList.length - 1];
  });

  builder.addCase(answerQuestion.rejected, (state, { payload }) => {
    state.hasAnswered = false;
    state.currentCard = state.practiceList[state.practiceList.length - 1];
  });
};

export const answerQuestionThunkReducersApp = (builder: ActionReducerMapBuilder<AppState>) => {
  builder.addCase(answerQuestion.fulfilled, (state, { payload }) => {
    if (state.cards[payload.cardId]) {
      state.cards[payload.cardId].Level = payload.newLevel;
      state.cards[payload.cardId].CycleLastSeen = payload.cycle;
    }
  });

  builder.addCase(answerQuestion.rejected, (state, { payload }) => {});
};
