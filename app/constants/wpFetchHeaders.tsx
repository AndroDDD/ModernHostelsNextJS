export const wpAuthorizationHeaderValue =
  "Basic " +
  btoa(
    `${process.env.NEXT_PUBLIC_WORDPRESS_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_WORDPRESS_BASIC_AUTH_PASSWORD}`
  );
