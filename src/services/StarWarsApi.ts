import type { Action, PayloadAction } from '@reduxjs/toolkit';
import {
  // CombinedState,
  // EndpointDefinition,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { SearchResp } from '../model/TypesStarWars';
import type { RootState } from '../store/Store';

interface SearchedParams {
  searchQuery: string;
  pageNumber: number;
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
  extractRehydrationInfo(action, { reducerPath }): any { // eslint-disable-line
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  // extractRehydrationInfo(
  //   action,
  //   { reducerPath },
  // ): CombinedState<EndpointDefinition, string, 'starWarsApi'> | undefined {
  //   if (isHydrateAction(action)) {
  //     return action.payload[reducerPath];
  //   }

  //   return undefined;
  // },
  endpoints: (builder) => ({
    fetchCharacters: builder.query<SearchResp, SearchedParams>({
      query: ({ searchQuery, pageNumber }) => {
        if (searchQuery !== '' && searchQuery !== 'null') {
          return `/?search=${searchQuery}&format=json&page=${pageNumber}`;
        }

        return `/?page=${pageNumber}`;
      },
    }),
    fetchSearchedCharacters: builder.query<SearchResp, string>({
      query: (searchQuery) => `/?search=${searchQuery}&format=json`,
    }),
  }),
});

export const { useFetchSearchedCharactersQuery, useFetchCharactersQuery } =
  starWarsApi;
