import { HasPreviouslyLoggedInCookieData } from "@/app/types/hasPreviouslyLoggedInCookieData";

export const handleAuth0LoggingInCookieDataForRedirect = (pathname: string) => {
  const hasPreviouslyLoggedInCookieData: HasPreviouslyLoggedInCookieData = {
    attemptedReLogin: true,
    pathname: pathname,
  };

  document.cookie = `hasPreviouslyLoggedIn=${JSON.stringify(
    hasPreviouslyLoggedInCookieData
  )}; path=/; domain=${window.location.hostname}`;
};
