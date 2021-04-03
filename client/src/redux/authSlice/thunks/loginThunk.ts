import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../authState';

interface loginThunkInterface {
  username: string;
  password: string;
}

export const login = createAsyncThunk<string, loginThunkInterface>(
  'auth/login',
  async ({ username, password }): Promise<string> => {
    const user: CognitoUser = await Auth.signIn(username, password);
    return user.getUsername();
  }
);

export const loginThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(login.fulfilled, (state, { payload }) => {
    state.isAuthenticated = true;
    state.isConfirmed = true;
    state.user = payload;
  });

  builder.addCase(login.rejected, (state, { error, meta }) => {
    if (error.code === 'UserNotConfirmedException') {
      state.isAuthenticated = true;
      state.isConfirmed = false;
      state.user = meta.arg.username;
    }
  });
};
