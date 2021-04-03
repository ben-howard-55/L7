import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../AuthState';

interface loginThunkInterface {
  username: string;
  password: string;
}

interface result {
  username: string;
  token: string;
}

export const login = createAsyncThunk<result, loginThunkInterface>(
  'auth/login',
  async ({ username, password }): Promise<result> => {
    const user: CognitoUser = await Auth.signIn(username, password);
    const token = (user as any).signInUserSession.idToken.jwtToken;
    return {
      username: user.getUsername(),
      token,
    };
  }
);

export const loginThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(login.fulfilled, (state, { payload }) => {
    state.isAuthenticated = true;
    state.isConfirmed = true;
    state.user = payload.username;
    state.token = payload.token;
  });

  builder.addCase(login.rejected, (state, { error, meta }) => {
    if (error.code === 'UserNotConfirmedException') {
      state.isAuthenticated = true;
      state.isConfirmed = false;
      state.user = meta.arg.username;
    }
  });
};
