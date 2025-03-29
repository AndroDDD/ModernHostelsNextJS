"use server";

import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

const retrieveOrderDataFromServerCookie = (): any | null => {
  const COOKIE_NAME: string = "orderData";
  const orderDataCookie = (cookies() as unknown as UnsafeUnwrappedCookies).get(COOKIE_NAME)?.value;
  const orderData = orderDataCookie ? JSON.parse(orderDataCookie) : {};

  return orderData ?? null;
};

export { retrieveOrderDataFromServerCookie };
