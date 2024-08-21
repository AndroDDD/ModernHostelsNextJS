export const secureHTTPProtocol = (url: string) => {
  let securedURL = url;

  if (url.includes("http://")) {
    securedURL = url.replace("http://", "https://");
  } else if (!url.includes("https://")) {
    securedURL = `https://${url}`;
  }

  return securedURL;
};
