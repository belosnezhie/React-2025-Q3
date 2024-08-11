import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import favoriteCharactersReducer from './favoriteCharacterSlice/FavoriteCharacterSlice';

const rootReducer = combineReducers({
  favoriteCharacters: favoriteCharactersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
