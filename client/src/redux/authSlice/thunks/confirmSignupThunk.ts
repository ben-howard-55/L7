import Auth from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../authState';

interface confirmSignupThunkInterface {
  username: string;
  code: string;
}

export const confirmSignup = createAsyncThunk<any, confirmSignupThunkInterface>(
  'auth/confirmSignup',
  async ({ username, code }) => await Auth.confirmSignUp(username, code)
);

export const confirmSignupThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(confirmSignup.fulfilled, (state, { payload }) => {
    state.isAuthenticated = true;
    state.isConfirmed = true;
  });

  builder.addCase(confirmSignup.rejected, (state, { payload }) => {});
};
