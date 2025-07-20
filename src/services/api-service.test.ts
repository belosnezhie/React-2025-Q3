import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { expect } from 'vitest';

import { testCharactersSearchArr } from '../test-utils/test-data';

import { ApiService } from './api-service';

describe('success scenarios', () => {
  let server: SetupServerApi;
  let apiService: ApiService;

  beforeEach(() => {
    const handlers = [
      http.get('https://swapi.py4e.com/api/people/', async () => {
        await delay(150);

        return HttpResponse.json(testCharactersSearchArr);
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
  afterAll(() => server.close());

  test('getDefaultData should handle a valid http response', async () => {
    const actual = await apiService.getDefaultData(0);

    expect(actual).toStrictEqual(testCharactersSearchArr);
  });

  test('getSearchData should handle a valid http response', async () => {
    const actual = await apiService.getSeachedData('test');

    expect(actual).toStrictEqual(testCharactersSearchArr);
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
  afterAll(() => server.close());

  test('getDefaultData should throw an error from http response', async () => {
    await expect(() => apiService.getDefaultData(0)).rejects.toThrowError();
  });

  test('getSearchData should throw an error from http response', async () => {
    await expect(() =>
      apiService.getSeachedData('test'),
    ).rejects.toThrowError();
  });
});
