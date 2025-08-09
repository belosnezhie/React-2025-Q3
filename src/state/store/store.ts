import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { starWarsApi } from '@/services/api-service';

import favoritesReducer from './favorites-slice/favorites-slice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  [starWarsApi.reducerPath]: starWarsApi.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // Using .concat per RTK docs to avoid potential TS type loss with spread
    // See https://redux-toolkit.js.org/api/getDefaultMiddleware
    // eslint-disable-next-line unicorn/prefer-spread
    getDefaultMiddleware().concat(starWarsApi.middleware),
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
