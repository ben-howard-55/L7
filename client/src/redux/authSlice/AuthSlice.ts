import { createSlice } from '@reduxjs/toolkit';
import { hydrateAuthReducers } from './thunks/hydrateThunk';
import { loginThunkReducers } from './thunks/loginThunk';
import { logoutThunkReducers } from './thunks/logoutThunk';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    isAuthenticated: false,
    isHydrated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    hydrateAuthReducers(builder);
    loginThunkReducers(builder);
    logoutThunkReducers(builder);
  },
});

const { reducer } = stateSlice;

export default reducer;
