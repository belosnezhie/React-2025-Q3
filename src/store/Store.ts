import { combineReducers, configureStore } from '@reduxjs/toolkit';

import favoriteCharactersReducer from './favoriteCharacterSlice/FavoriteCharacterSlice';

const rootReducer = combineReducers({
  favoriteCharacters: favoriteCharactersReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
