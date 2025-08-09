import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CharacterSearchResponse,
  SearchResponse,
} from '@/model/types-star-wars';

const BASE_URL = 'https://swapi.py4e.com/api/people';

export interface SearchedParameters {
  pageNumber: number;
  searchQuery: string;
}

export const starWarsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<SearchResponse, SearchedParameters>({
      query: ({ pageNumber, searchQuery }) => {
        if (searchQuery !== '' && searchQuery !== 'null') {
          return `/?search=${searchQuery}&format=json&page=${pageNumber}`;
        }

        return `/?page=${pageNumber}`;
      },
    }),
    fetchSearchedCharacters: builder.query<CharacterSearchResponse, string>({
      query: (searchID) => `${BASE_URL}/${searchID}/`,
    }),
  }),
  reducerPath: 'starWarsApi',
});

export const { useFetchCharactersQuery, useFetchSearchedCharactersQuery } =
  starWarsApi;
