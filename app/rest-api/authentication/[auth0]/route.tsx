import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";

import { createCustomerApiUrl } from "@/app/constants/wpApiUrl";

const afterCallback = async (req: any, session: any, state: any) => {
  const { user } = session;
  const userId = user.sub;
  const email = user.email;

  let username = user.name as string | undefined;
  let chat_name = user.name as string | undefined;

  username = username ? username.split("@")[0] : username;
  chat_name = chat_name ? chat_name.split("@")[0] : chat_name;

  try {
    const customerWPDataResponse = await fetch(createCustomerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        username: username,
        chat_name: chat_name,
        email: email,
      }),
    });

    const customerWPDataJson = await customerWPDataResponse.json();
    console.log({ customerWPDataJson });

    if (
      customerWPDataJson["customer_data"] &&
      customerWPDataJson["customer_data"]["profile"]
    ) {
      const customer_id = customerWPDataJson["customer_id"];
      const { username, chat_name, email } =
        customerWPDataJson["customer_data"]["profile"];
      user.name = username ? username : user.name;
      user.chatName = chat_name ? chat_name : user.name;
      user.email = email ? email : user.email;
      user.sub = customer_id ? customer_id : user.sub;
    }
  } catch (err: any) {
    console.log({ error: err.message });
  }

  return session;
};

export const GET = handleAuth({
  signup: handleLogin({
    authorizationParams: { screen_hint: "signup" },
  }),
  callback: handleCallback({ afterCallback }),
});
