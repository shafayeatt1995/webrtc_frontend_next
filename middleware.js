import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const guest = ["/signin", "/signup", "/social-login"];
const authExactUrls = [];
const authStartsWithRoutes = ["/profile", "/room"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isExactAuthRoute = authExactUrls.includes(pathname);
  const isStartsWithAuthRoute = authStartsWithRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!(isExactAuthRoute || isStartsWithAuthRoute)) {
    if (token && guest.includes(pathname)) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  }

  if (!token && (isExactAuthRoute || isStartsWithAuthRoute)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/(.*)"] };
