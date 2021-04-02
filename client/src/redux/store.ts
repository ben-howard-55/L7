import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import stateSlice from './stateSlice/StateSlice';

const store = configureStore({
  reducer: {
    state: stateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
