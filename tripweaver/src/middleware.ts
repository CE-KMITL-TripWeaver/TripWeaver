import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing, {
    localeDetection: false,
});

export default function middleware(req: NextRequest) {
    console.log(req.nextUrl.pathname);

    if (req.nextUrl.pathname.startsWith('/api')) {
        
        return NextResponse.next();
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: [
        '/:path*',
    ],
};
