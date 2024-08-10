import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const getSearchParams = (headers: ReadonlyHeaders) => {
  let query = headers.get('x-current-query');

  if (query === null) {
    query = '';
  }
  const page = headers.get('x-current-page');

  const params = {
    page: page,
    query: query,
  };

  return params;
};
