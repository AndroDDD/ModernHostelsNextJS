import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

import { BookingDataForCookie } from "../types/bookingDataForCookie";

const retrieveBookingDataFromServerCookie = (): BookingDataForCookie | null => {
  const COOKIE_NAME: string = "bookingData";
  const bookingDataCookie = (cookies() as unknown as UnsafeUnwrappedCookies).get(COOKIE_NAME)?.value;
  const bookingData = bookingDataCookie ? JSON.parse(bookingDataCookie) : {};

  return bookingData ?? null;
};

export { retrieveBookingDataFromServerCookie };
