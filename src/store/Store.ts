import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { starWarsApi } from '../services/StarWarsApi';

import counterReducer from './counter/counterSlice';
import favoriteCharactersReducer from './favoriteCharacter/FavoriteCharacterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    favoriteCharacters: favoriteCharactersReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
