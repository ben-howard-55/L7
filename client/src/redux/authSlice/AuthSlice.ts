import { createSlice } from '@reduxjs/toolkit';
import { hydrateAuthReducers } from './thunks/hydrateThunk';
import { logoutThunkReducers } from './thunks/logoutThunk';
import { loginThunkReducers } from './thunks/loginThunk';
import { signupThunkReducers } from './thunks/signupThunk';
import { confirmSignupThunkReducers } from './thunks/confirmSignupThunk';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    isAuthenticated: false,
    isHydrated: false,
    user: '',
    isConfirmed: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    hydrateAuthReducers(builder);
    loginThunkReducers(builder);
    logoutThunkReducers(builder);
    signupThunkReducers(builder);
    confirmSignupThunkReducers(builder);
  },
});

const { reducer } = stateSlice;

export default reducer;
