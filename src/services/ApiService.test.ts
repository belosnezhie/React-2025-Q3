import { expect, test, vi } from 'vitest';

import { ApiService } from './ApiService';

test('should getDefaultData fetched with correct parametrs', async () => {
  const resEncodedMessage = new TextEncoder().encode('1');
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(resEncodedMessage);
      controller.close();
    },
  });
  const options = { status: 200 };
  const fakeResr: Response = new Response(stream, options);

  const asyncMock = vi.fn().mockResolvedValue(fakeResr);

  const apiService = new ApiService(asyncMock);

  await apiService.getDefaultData(0);

  expect(asyncMock.mock.calls).lengthOf(1);
  expect(asyncMock.mock.calls[0]).toEqual([
    'https://swapi.dev/api/people/?page=0',
  ]);
});

test('should getSearchData fetched with correct parametrs', async () => {
  const resEncodedMessage = new TextEncoder().encode('1');
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(resEncodedMessage);
      controller.close();
    },
  });
  const options = { status: 200 };
  const fakeResr: Response = new Response(stream, options);

  const asyncMock = vi.fn().mockResolvedValue(fakeResr);

  const apiService = new ApiService(asyncMock);

  await apiService.getSeachedData('test');

  expect(asyncMock.mock.calls).lengthOf(1);
  expect(asyncMock.mock.calls[0]).toEqual([
    'https://swapi.dev/api/people/?search=test&format=json',
  ]);
});
