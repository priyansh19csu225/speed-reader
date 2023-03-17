/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      comprehensions: [],
      selectedComprehension: {},
    },
    pending: null,
    error: false,
  },
  reducers: {
    getComprehensionsStart: (state) => {
      state.pending = true;
    },
    getComprehensionsSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.comprehensions = action.payload.data;
    },
    getComprehensionsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    setComprehension: (state, action) => {
      state.userInfo.selectedComprehension = action.payload;
    },
  },
});

export const {
  getComprehensionsStart,
  getComprehensionsSuccess,
  getComprehensionsFailure,
  setComprehension,
} = userSlice.actions;

export default userSlice.reducer;
