export const retrieveOrderDataFromCookie = (): any => {
  const COOKIE_NAME: string = "orderData";
  const cookies = document.cookie.split(";");

  let orderData = null;

  cookies.forEach((cookie) => {
    if (
      cookie.startsWith(COOKIE_NAME) ||
      cookie.startsWith(` ${COOKIE_NAME}`)
    ) {
      orderData = JSON.parse(cookie.replace(`${COOKIE_NAME}=`, ""));
    }
  });

  return orderData;
};
