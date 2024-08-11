import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
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

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
