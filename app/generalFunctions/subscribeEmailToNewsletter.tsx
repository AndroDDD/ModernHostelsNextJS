"use server";

import { newsletterApiUrl } from "../constants/wpApiUrl";

export const subscribeEmailToNewsletter = async (
  email: string,
  subscriberType: string
) => {
  const subscriberAddedResponse = await fetch(
    `${newsletterApiUrl}add/${subscriberType.toLowerCase()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  const subscriberAddedJson = await subscriberAddedResponse.json();
  const subscriptionStatus = subscriberAddedJson.status;

  console.log({ subscriberAddedJson });

  if (subscriptionStatus === 201) {
    return true;
  } else {
    return false;
  }
};
