import { configureStore } from '@reduxjs/toolkit';
import globalSnackbarReducer from './snackBarSlice';

export default configureStore({
  reducer: {
    globalSnackbar: globalSnackbarReducer,
  },
});
