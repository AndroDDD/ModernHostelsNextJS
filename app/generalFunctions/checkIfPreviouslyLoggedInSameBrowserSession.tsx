import { HasPreviouslyLoggedInCookieData } from "@/app/types/hasPreviouslyLoggedInCookieData";

const checkIfPreviouslyLoggedInSameBrowserSession =
  (): HasPreviouslyLoggedInCookieData | void => {
    const COOKIE_NAME: string = "hasPreviouslyLoggedIn";
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      if (
        cookie.startsWith(COOKIE_NAME) ||
        cookie.startsWith(` ${COOKIE_NAME}`)
      ) {
        return JSON.parse(
          cookie.replace(`${COOKIE_NAME}=`, "")
        ) as HasPreviouslyLoggedInCookieData;
      }
    });
  };

export { checkIfPreviouslyLoggedInSameBrowserSession };
