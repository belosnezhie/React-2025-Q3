// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResp } from '../model/TypesStarWars';

export interface SearchedParams {
  searchQuery: string;
  pageNumber: number;
}

// import type { SearchResp } from './types';

// Define a service using a base URL and expected endpoints
export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
  endpoints: (builder) => ({
    fetchDefaultCharacters: builder.query<SearchResp, number>({
      query: (pageNumber) => `/?page=${pageNumber}`,
    }),
    fetchSearchedCharacters: builder.query<SearchResp, SearchedParams>({
      query: ({ searchQuery, pageNumber }) =>
        `/?search=${searchQuery}&format=json&page=${pageNumber}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchDefaultCharactersQuery,
  useFetchSearchedCharactersQuery,
} = starWarsApi;
