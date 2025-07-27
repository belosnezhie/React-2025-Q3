import { delay, http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { expect } from 'vitest';

import {
  testCharactersSearch,
  testCharactersSearchArray,
} from '@/__tests__/test-utils/test-data';
import { ApiService } from '@/services/api-service';

const DELAY = 150;
describe('success scenarios', () => {
  let server: SetupServerApi;
  let apiService: ApiService;

  beforeEach(() => {
    const handlers = [
      http.get('https://swapi.py4e.com/api/people/', async () => {
        await delay(DELAY);

        return HttpResponse.json(testCharactersSearchArray);
      }),
      http.get('https://swapi.py4e.com/api/people/1/', async () => {
        await delay(DELAY);

        return HttpResponse.json(testCharactersSearch);
      }),
    ];

    server = setupServer(...handlers);
    server.listen();
    apiService = new ApiService();
  });

  afterEach(() => {
    server.resetHandlers();
    server.close();
  });
  afterAll(() => {
    server.close();
  });

  test('getDefaultData should handle a valid http response', async () => {
    const actual = await apiService.getDefaultData(0);

    expect(actual).toStrictEqual(testCharactersSearchArray);
  });

  test('getSearchData should handle a valid http response', async () => {
    const actual = await apiService.getSeachedData('1');

    expect(actual).toStrictEqual(testCharactersSearch);
  });
});

describe('error scenarios', () => {
  let server: SetupServerApi;
  let apiService: ApiService;

  beforeEach(() => {
    const handlers = [
      http.get(
        'https://swapi.py4e.com/api/people/',
        () => new HttpResponse(null, { status: 401 }),
      ),
    ];

    server = setupServer(...handlers);
    server.listen();
    apiService = new ApiService();
  });

  afterEach(() => {
    server.resetHandlers();
    server.close();
  });
  afterAll(() => {
    server.close();
  });

  test('getDefaultData should throw an error from http response', async () => {
    await expect(() => apiService.getDefaultData(0)).rejects.toThrowError();
  });

  test('getSearchData should throw an error from http response', async () => {
    await expect(() =>
      apiService.getSeachedData('test'),
    ).rejects.toThrowError();
  });
});
