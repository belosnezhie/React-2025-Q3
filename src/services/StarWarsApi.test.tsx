import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { afterEach, expect, test } from 'vitest';

import { testCharactersSearchArr } from '../components/main/TestData';

import { getDefaultData, getSearchedData } from './StarWarsApi';

let server: SetupServerApi;

afterEach(() => {
  server.resetHandlers();
  server.close();
});

test('getDefaultData could fetch default data', async () => {
  const handlers = [
    http.get('https://swapi.dev/api/people/?page=1&search=', async () => {
      await delay(150);

      return HttpResponse.json(testCharactersSearchArr);
    }),
  ];

  server = setupServer(...handlers);

  server.listen();
  const data = await getDefaultData(1, '');

  expect(data.count).equals(testCharactersSearchArr.count);
  expect(JSON.stringify(data.results)).equals(
    JSON.stringify(testCharactersSearchArr.results),
  );
});

test('getDefaultData will throw an error', async () => {
  const handlers = [
    http.get('https://swapi.dev/api/people/?page=1&search=', async () => {
      await delay(150);

      return new HttpResponse(null, {
        status: 404,
        statusText: 'test',
      });
    }),
  ];

  server = setupServer(...handlers);

  server.listen();

  let result = '';

  try {
    await getDefaultData(1, '');
  } catch (e) {
    result = (e as Error).message;
  }

  expect(result).equals('Request faild!');
});

test('getSearchedData could fetch searched data', async () => {
  const handlers = [
    http.get('https://swapi.dev/api/people/?&search=test', async () => {
      await delay(150);

      return HttpResponse.json(testCharactersSearchArr);
    }),
  ];

  server = setupServer(...handlers);

  server.listen();
  const data = await getSearchedData('test');

  expect(data.count).equals(testCharactersSearchArr.count);
  expect(JSON.stringify(data.results)).equals(
    JSON.stringify(testCharactersSearchArr.results),
  );
});

test('getSearchedData will throw an error', async () => {
  const handlers = [
    http.get('https://swapi.dev/api/people/?&search=test', async () => {
      await delay(150);

      return new HttpResponse(null, {
        status: 404,
        statusText: 'test',
      });
    }),
  ];

  server = setupServer(...handlers);

  server.listen();

  let result = '';

  try {
    await getSearchedData('test');
  } catch (e) {
    result = (e as Error).message;
  }

  expect(result).equals('Request faild!');
});
