export const retrieveCurrentPathnameFromCookie = (): string | void => {
  const COOKIE_NAME: string = "currentPathname";
  const cookies = document.cookie.split(";");

  let currentPathname: string;

  cookies.forEach((cookie) => {
    if (
      cookie.startsWith(COOKIE_NAME) ||
      cookie.startsWith(` ${COOKIE_NAME}`)
    ) {
      return (currentPathname = cookie.replace(`${COOKIE_NAME}=`, "").trim());
    }
  });
};
