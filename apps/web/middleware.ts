import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/", 
  "/pricing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const userSession = await auth();

  await auth.protect();

  // Handle admin routes
  if (isAdminRoute(req)) {
    if (userSession?.sessionClaims?.metadata?.role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
