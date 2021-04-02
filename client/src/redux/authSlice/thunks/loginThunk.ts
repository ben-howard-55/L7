import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../authState';

interface loginThunkInterface {
  username: string;
  password: string;
}

export const login = createAsyncThunk<CognitoUser, loginThunkInterface>(
  'auth/login',
  async ({ username, password }): Promise<CognitoUser> => await Auth.signIn(username, password)
);

export const loginThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(login.fulfilled, (state, { payload }) => {
    state.isAuthenticated = true;
  });

  builder.addCase(login.rejected, (state, { payload }) => {});
};
