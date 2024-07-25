import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResp } from '../model/TypesStarWars';

export interface SearchedParams {
  searchQuery: string;
  pageNumber: number;
}

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
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
