import { NextRequest } from 'next/server';
import { expect, test } from 'vitest';

import { middleware } from './middleware';

test('Middleware should fill headers', () => {
  const fakeRequest = new NextRequest(new URL('http://test.test'));

  const result = middleware(fakeRequest);

  expect(result.headers.get('x-current-page')).equals('1');
  expect(result.headers.get('x-current-query')).equals('');
});
