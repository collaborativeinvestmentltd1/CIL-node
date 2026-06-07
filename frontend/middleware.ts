// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { PROTECTED_PREFIXES } from "./src/lib/routes";

// function isProtectedPath(pathname: string): boolean {
//   return PROTECTED_PREFIXES.some(
//     (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
//   );
// }

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (!isProtectedPath(pathname)) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("cil_token")?.value;
//   if (!token) {
//     const loginUrl = new URL("/auth/login", request.url);
//     loginUrl.searchParams.set("from", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };
