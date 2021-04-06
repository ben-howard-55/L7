import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import client, { Calendar } from '../../../api/client';
import state from '../AppState';

interface result {
  calendar: Calendar;
  cyclePosition: number;
}

export const fetchCalendarData = createAsyncThunk<result, void>(
  'app/fetchCalendarData',
  async () =>
    new Promise(async (resolve, reject) => {
      // fetch calendar, all users cards, cycle position
      const calendarResponse = await client.getCalendar();

      if (calendarResponse.status === 200) {
        resolve({
          calendar: calendarResponse.body.Chart,
          cyclePosition: calendarResponse.body.CurrentCyclePos,
        });
      } else {
        reject();
      }
    })
);

export const fetchCalendarDataThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(fetchCalendarData.fulfilled, (state, { payload }) => {
    state.calendar = payload.calendar;
    state.cyclePosition = payload.cyclePosition;
    state.hydratedCalendar = true;
  });

  builder.addCase(fetchCalendarData.rejected, (state, { payload }) => {});
};
