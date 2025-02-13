import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  afterAuth(auth, req) {
    // Replace this condition with your actual payment check
    const isPaid = false; // This should come from your database
    const isAuthPage = req.nextUrl.pathname.startsWith("/pricing");
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (!auth.userId && isDashboard) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (auth.userId && isDashboard && !isPaid && !isAuthPage) {
      const pricingUrl = new URL("/pricing", req.url);
      return NextResponse.redirect(pricingUrl);
    }

    return NextResponse.next();
  },
  publicRoutes: ["/", "/pricing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};