import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { myFetch } from "./utils/myFetch";
import { cookies } from "next/headers";

const authRoutes = [
  "/login",
  "/reset-password",
  "/forgot-password",
  "/verify-email",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    // Allow unauthenticated access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  // Get the current user from server
  const userRes = await myFetch("/user/me", {
    method: "GET",
  });

  const profile = userRes.data;

  if (!profile) {
    // Allow unauthenticated access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  // Allow only users with USER role
  if (
    !(
      profile.role === "ADMIN" ||
      profile.role === "SUPER_ADMIN" ||
      profile.role === "USER"
    )
  ) {
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   //   Don't allow authorized users to access auth routes
  //   if (authRoutes.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/blogs/:path*",
    "/dashboard/admin/:path*",
    "/dashboard/user/:path*",
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/verify-email",
  ],
};
