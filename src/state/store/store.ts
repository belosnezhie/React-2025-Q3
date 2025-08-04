import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites-slice/favorites-slice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
