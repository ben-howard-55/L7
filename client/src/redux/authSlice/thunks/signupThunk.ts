import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../AuthState';

interface signupThunkInterface {
  username: string;
  email: string;
  password: string;
}

interface result {
  user: CognitoUser;
  userConfirmed: boolean;
  userSub: string;
  codeDeliveryDetails: any;
}

export const signup = createAsyncThunk<result, signupThunkInterface>(
  'auth/signup',
  async ({ username, email, password }) =>
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
);

export const signupThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(signup.fulfilled, (state, { payload }) => {
    state.isAuthenticated = true;
    state.user = payload.user.getUsername();
  });

  builder.addCase(signup.rejected, (state, { payload }) => {});
};
