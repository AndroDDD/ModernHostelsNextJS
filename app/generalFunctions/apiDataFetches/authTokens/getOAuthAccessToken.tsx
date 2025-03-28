"use server";

export const getOAuthAccessToken = async () => {
  const accessTokenAPIURL = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
  const clientID = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  const wpAPIClientID = process.env.AUTH0_WP_API_CLIENT_ID;
  const wpAPIClientSecret = process.env.AUTH0_WP_API_CLIENT_SECRET;
  const wpAPIClientAudience = process.env.AUTH0_WP_AUDIENCE;
  const authorizeAPIURL = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?client_id=${clientID}&response_type=code&response_mode=web_message&scope=edit_posts&state=coconut_splash&redirect_uri=http:\/\/192.168.1.137:3000`;

  //   const authorizeResponse = await fetch(authorizeAPIURL, {
  //     method: "GET",
  //   });
  // const authorizeJSON = await authorizeResponse.text();
  const accessTokenResponse = await fetch(accessTokenAPIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "code",
      client_id: clientID,
      client_secret: clientSecret,
      audience: wpAPIClientAudience,
    }),
  });
  const accessTokenJSON = await accessTokenResponse.json();

  console.log({
    authorizeAPIURL,
    // authorizeJSON,
    accessTokenJSON: accessTokenJSON,
    clientID,
  });

  if ("access_token" in accessTokenJSON) {
    return accessTokenJSON.access_token;
  } else {
    return null;
  }
};
