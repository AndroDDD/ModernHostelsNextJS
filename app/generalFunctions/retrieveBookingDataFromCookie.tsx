import { BookingDataForCookie } from "../types/bookingDataForCookie";

const retrieveBookingDataFromCookie = (): BookingDataForCookie | null => {
  const COOKIE_NAME: string = "bookingData";
  const cookies = document.cookie.split(";");

  let bookingData = null;

  cookies.forEach((cookie) => {
    if (
      cookie.startsWith(COOKIE_NAME) ||
      cookie.startsWith(` ${COOKIE_NAME}`)
    ) {
      bookingData = JSON.parse(cookie.replace(`${COOKIE_NAME}=`, ""));
    }
  });

  return bookingData;
};

export { retrieveBookingDataFromCookie };
