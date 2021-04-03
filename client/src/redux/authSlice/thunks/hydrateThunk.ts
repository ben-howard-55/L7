import Auth from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import AuthState from '../authState';

export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  await Auth.currentAuthenticatedUser();
  return true;
});

export const hydrateAuthReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(hydrateAuth.fulfilled, (state, { payload }) => {
    state.isHydrated = true;
    state.isAuthenticated = true;
    state.isConfirmed = true;
  });
  builder.addCase(hydrateAuth.rejected, (state, action) => {
    state.isHydrated = true;
  });
};
