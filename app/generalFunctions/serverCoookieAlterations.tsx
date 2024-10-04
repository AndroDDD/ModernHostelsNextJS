"use server";

import { cookies } from "next/headers";

export async function deleteCookie(cookieName: string) {
  cookies().set(cookieName, "", {
    maxAge: -1, // Expire the cookie immediately
    path: "/", // Match the path the cookie was set on
  });
}
