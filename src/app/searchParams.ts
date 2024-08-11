import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const getSearchParams = (headers: ReadonlyHeaders) => {
  let query = headers.get('x-current-query');

  if (query === null) {
    query = '';
  }

  let name = headers.get('x-current-name');

  if (name === null) {
    name = '';
  }
  const page = headers.get('x-current-page');

  const params = {
    page: page,
    query: query,
    name: name,
  };

  return params;
};
