import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import appSlice from './appSlice/appSlice';
import authSlice from './authSlice/authSlice';
import gameSlice from './gameSlice/gameSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    game: gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
