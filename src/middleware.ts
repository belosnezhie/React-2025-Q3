import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const page = request.nextUrl.searchParams.get('page')
    ? request.nextUrl.searchParams.get('page')
    : 1;

  headers.set('x-current-page', String(page));

  const query = request.nextUrl.searchParams.get('search')
    ? request.nextUrl.searchParams.get('search')
    : '';

  if (query !== null) {
    headers.set('x-current-query', query);
  } else {
    headers.set('x-current-query', '');
  }

  const name = request.nextUrl.searchParams.get('detailed')
    ? request.nextUrl.searchParams.get('detailed')
    : '';

  if (name !== null) {
    headers.set('x-current-name', name);
  } else {
    headers.set('x-current-name', '');
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
