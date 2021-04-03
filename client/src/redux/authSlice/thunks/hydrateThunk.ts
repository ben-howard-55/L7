import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import AuthState from '../AuthState';

export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  const token = (user as any).signInUserSession.idToken.jwtToken;
  console.log(token);
  return {
    username: user.getUsername(),
    token,
  };
});

export const hydrateAuthReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(hydrateAuth.fulfilled, (state, { payload }) => {
    state.isHydrated = true;
    state.isAuthenticated = true;
    state.isConfirmed = true;
    state.user = payload.username;
    state.token = payload.token;
  });
  builder.addCase(hydrateAuth.rejected, (state, action) => {
    state.isHydrated = true;
  });
};
