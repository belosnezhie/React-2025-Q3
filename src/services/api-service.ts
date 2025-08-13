import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CharacterSearchResponse,
  SearchResponse,
} from '@/model/types-star-wars';
import {
  validateCharacterSearchResponse,
  validateSearchResponse,
} from '@/utils/guards';

const BASE_URL = 'https://swapi.py4e.com/api/people';

export interface SearchedParameters {
  pageNumber: number;
  searchQuery: string;
}

export const starWarsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<SearchResponse, SearchedParameters>({
      providesTags: ['Characters'],
      query: ({ pageNumber, searchQuery }) => {
        if (searchQuery !== '') {
          return `/?search=${searchQuery}&format=json&page=${pageNumber}`;
        }

        return `/?page=${pageNumber}`;
      },
      transformResponse: (response: SearchResponse) => {
        if (!validateSearchResponse(response)) {
          throw new Error('Invalid response format');
        }
        return response;
      },
    }),
    fetchSearchedCharacters: builder.query<CharacterSearchResponse, string>({
      providesTags: ['Details'],
      query: (searchID) => `/${searchID}/`,
      transformResponse: (response: CharacterSearchResponse) => {
        if (!validateCharacterSearchResponse(response)) {
          throw new Error('Invalid response format');
        }
        return response;
      },
    }),
  }),
  reducerPath: 'starWarsApi',
  tagTypes: ['Characters', 'Details'],
});

export const { useFetchCharactersQuery, useFetchSearchedCharactersQuery } =
  starWarsApi;
