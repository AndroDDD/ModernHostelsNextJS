import { cookies } from "next/headers";

import { BookingDataForCookie } from "../types/bookingDataForCookie";

const retrieveBookingDataFromServerCookie = async (): Promise<BookingDataForCookie | null> => {
  const COOKIE_NAME: string = "bookingData";
  const bookingDataCookie = (await cookies()).get(COOKIE_NAME)?.value;
  const bookingData = bookingDataCookie ? JSON.parse(bookingDataCookie) : {};

  return bookingData ?? null;
};

export { retrieveBookingDataFromServerCookie };
