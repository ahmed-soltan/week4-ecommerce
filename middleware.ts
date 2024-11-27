import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export const { auth } = NextAuth(authConfig);

import pathToRegexp from "path-to-regexp"; // Install with `npm install path-to-regexp`

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.some((route) =>
    typeof route === "string"
      ? route === nextUrl.pathname
      : route instanceof RegExp
      ? route.test(nextUrl.pathname)
      : false
  );
  
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isAddToCartRoute = nextUrl.pathname.startsWith("/api/cart");

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // if (isAddToCartRoute && !isLoggedIn) {
  //   throw new Error("Unauthenticated")
  // }

  if (!isLoggedIn && !isPublicRoute ) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});


export const config = {
  matcher: [
    // Apply to dynamic product routes
    "/api/product/:productId/related-products",
    "/product/:productId",
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
