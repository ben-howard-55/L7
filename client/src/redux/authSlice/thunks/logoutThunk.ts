import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import state from '../AuthState';

export const logout = createAsyncThunk<CognitoUser>(
  'auth/logout',
  async (): Promise<CognitoUser> => Auth.signOut()
);

export const logoutThunkReducers = (builder: ActionReducerMapBuilder<state>) => {
  builder.addCase(logout.fulfilled, (state, { payload }) => {
    state.isAuthenticated = false;
  });
};
