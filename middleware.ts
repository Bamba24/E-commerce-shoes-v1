import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute } from "./app/utils/auth";

 export default function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;

   // Check if the request is for a protected route
   if (isProtectedRoute(pathname)) {
     const token = req.cookies.get("token");

     // If no token is found, redirect to login
     if (!token) {
       return NextResponse.redirect(new URL("/not-found", req.url));
     }
   }

   return NextResponse.next();
 }