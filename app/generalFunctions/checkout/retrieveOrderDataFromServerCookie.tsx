"use server";

import { cookies } from "next/headers";

const retrieveOrderDataFromServerCookie = async (): Promise<any | null> => {
  const COOKIE_NAME: string = "orderData";
  const orderDataCookie = (await cookies()).get(COOKIE_NAME)?.value;
  const orderData = orderDataCookie ? JSON.parse(orderDataCookie) : {};

  return orderData ?? null;
};

export { retrieveOrderDataFromServerCookie };
