import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import AuthState from '../authState';

export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  const token = (user as any).signInUserSession.idToken.jwtToken;
  console.log(token);
  return user.getUsername();
});

export const hydrateAuthReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(hydrateAuth.fulfilled, (state, { payload }) => {
    state.isHydrated = true;
    state.isAuthenticated = true;
    state.isConfirmed = true;
    state.user = payload;
  });
  builder.addCase(hydrateAuth.rejected, (state, action) => {
    state.isHydrated = true;
  });
};
