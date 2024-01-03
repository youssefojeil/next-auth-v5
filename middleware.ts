import authConfig from '@/auth.config';

import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log('ROUTE:', req.nextUrl.pathname);

  const isLoggedIn = !!req.auth;
  console.log(`IS LOGGED IN ${isLoggedIn}`);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
