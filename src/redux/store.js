import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import globalSnackbarReducer from './snackBarSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['globalSnackbar'],
};

const rootReducer = combineReducers({
  user: userReducer,
  globalSnackbar: globalSnackbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'user/getComprehensionsStart',
          'user/getComprehensionsFailure',
          'user/setComprehension',
          'user/setStaticReader',
          'user/showSnackBar',
          'user/getComprehensionsSuccess',
          'user/setUserRoleAndEmail',
          'globalSnackbar/showSnackBar',
          'user/setWordsPerMinute',
        ],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
