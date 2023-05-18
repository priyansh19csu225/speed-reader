/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      isAdmin: false,
      email: null,
      account_level: 1,
    },
    isStaticReader: false,
    pending: null,
    error: false,
    comprehensions: [],
    selectedComprehension: {},
    wpm: 250,
  },
  reducers: {
    getComprehensionsStart: (state) => {
      state.pending = true;
    },
    getComprehensionsSuccess: (state, action) => {
      state.pending = false;
      state.comprehensions = action.payload.data;
    },
    getComprehensionsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    setWordsPerMinute: (state, action) => {
      state.wpm = action.payload;
    },
    setComprehension: (state, action) => {
      state.selectedComprehension = action.payload;
    },
    setStaticReader: (state) => {
      state.isStaticReader = !state.isStaticReader;
    },
    setUserRoleAndEmail: (state, action) => {
      state.userInfo.isAdmin = action.payload.isAdmin;
      state.userInfo.email = action.payload.email;
    },
  },
});

export const {
  getComprehensionsStart,
  getComprehensionsSuccess,
  getComprehensionsFailure,
  setComprehension,
  setStaticReader,
  setUserRoleAndEmail,
  setWordsPerMinute,
} = userSlice.actions;

export default userSlice.reducer;
