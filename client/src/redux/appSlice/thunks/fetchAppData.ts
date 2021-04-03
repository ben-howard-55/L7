import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Calendar } from '../../../api/client';
import state from '../appState';

interface result {
  calendar: Calendar;
  cyclePosition: number;
}

export const fetchAppData = createAsyncThunk<result, void>(
  'app/fetchAppData',
  async () =>
    new Promise(async (resolve, reject) => {
      // fetch calendar, all users cards, cycle position
      const res = await client.getCalendar();

      if (res.status === 200) {
        resolve({
          calendar: res.body.calendar,
          cyclePosition: res.body.cyclePosition,
        });
      } else {
        reject();
      }
    })
);

export const fetchAppDataThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(fetchAppData.fulfilled, (state, { payload }) => {
    state.calendar = payload.calendar;
    state.cyclePosition = payload.cyclePosition;
    state.hydrated = true;
  });

  builder.addCase(fetchAppData.rejected, (state, { payload }) => {});
};
