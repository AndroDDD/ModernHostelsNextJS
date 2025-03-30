"use server";

import { getSession, updateSession } from "@auth0/nextjs-auth0";

import {
  updateCustomerApiUrl,
  updateCustomerOrderReviewApiUrl,
  customersDataApiUrl,
  customerOrdersApiUrl,
  customerRewardsApiUrl,
  customerRewardsTierApiUrl,
  getUserChatMessagesApiUrl,
  getUserChatConversationIdsApiUrl,
  sendUserChatMessageApiUrl,
  propertyUpdateRatingsApiUrl,
} from "@/app/constants/wpApiUrl";
import { RatingSendData } from "@/app/types/ratingsData";
import { fetchOriginHeader } from "../../devToPro/useDevOrigin";

export async function fetchCustomersData(
  params: {
    ids?: boolean;
    username?: boolean;
    chat_name?: boolean;
    email?: boolean;
    search_in?: string;
    search_term?: string;
  } = {}
) {
  const response = await fetch(`${customersDataApiUrl}`, {
    headers: { "Content-Type": "application/json", Origin: fetchOriginHeader },
    method: "POST",
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
}

export async function updateCustomerData(params: {
  id: string;
  username?: string;
  chat_name?: string;
  email?: string;
}) {
  try {
    const session = await getSession();

    if (!session) {
      return;
    }

    const updatedCustomerResponse = await fetch(`${updateCustomerApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: fetchOriginHeader,
      },
      body: JSON.stringify(params),
    });

    const updatedCustomerJson = await updatedCustomerResponse.json();

    await updateSession({
      ...session,
      user: {
        ...session.user,
        name: params.username,
        chatName: params.chat_name,
        email: params.email,
      },
    });

    return updatedCustomerJson;
  } catch (e: any) {
    console.log({ error: e.message });
    return { error: e.message };
  }
}

export async function fetchCustomerOrders(customerId: string) {
  const response = await fetch(`${customerOrdersApiUrl}`, {
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    method: "POST",
    body: JSON.stringify({
      customer_id: customerId,
    }),
  });

  const data = await response.json();

  return data;
}

export async function fetchCustomerRewards(customerId: string) {
  const customerRewardsTierResponse = await fetch(
    `${customerRewardsTierApiUrl}`,
    {
      method: "GET",
      headers: {
        Origin: fetchOriginHeader,
      },
    }
  );
  const customerRewardsResponse = await fetch(`${customerRewardsApiUrl}`, {
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    method: "POST",
    body: JSON.stringify({
      customer_id: customerId,
    }),
  });

  const customerRewardsTierData =
    (await customerRewardsTierResponse.json()) as unknown as {
      [key: string | number]: {
        label: string;
        reward: string;
        badge: string;
        id: string;
      }[];
    };
  const customerRewardsData = await customerRewardsResponse.json();

  let earnedRewards: {
    [key: string]: {
      quantity: number;
      badgeUrl: string;
      label: string;
    };
  } = {};

  customerRewardsData["rewards"]["earned_rewards"].forEach(
    (
      rewardData:
        | {
            dictionary_property: string | number;
            reward: string;
            reward_id: string;
          }
        | string
    ) => {
      if (
        typeof rewardData === "object" &&
        "dictionary_property" in rewardData
      ) {
        if (
          !rewardData.reward_id ||
          !customerRewardsTierData[rewardData.dictionary_property]
        ) {
          return;
        }

        const tierRewardData = customerRewardsTierData[
          rewardData.dictionary_property
        ].find(
          (tierRewardsData: {
            label: string;
            reward: string;
            badge: string;
            id: string;
          }) => {
            return (
              tierRewardsData.id && tierRewardsData.id === rewardData.reward_id
            );
          }
        );

        if (!earnedRewards[rewardData.reward_id]) {
          earnedRewards[rewardData.reward_id] = {
            quantity: 1,
            badgeUrl: tierRewardData?.badge ?? "",
            label: tierRewardData?.label ?? "",
          };
        } else {
          earnedRewards[rewardData.reward_id].quantity++;
        }
      }
      // else if (typeof rewardData === "string") {
      //   const rewardTiersFlattened = Object.entries(customerRewardsTierData);

      //   for (let k = 0; k < rewardTiersFlattened.length; k++) {
      //     const rewardTier = rewardTiersFlattened[k];

      //     let foundReward = false;

      //     for (let i = 0; i < rewardTier[1].length; i++) {
      //       const tierReward = rewardTier[1][i];

      //       if (tierReward.reward === rewardData) {
      //         if (!earnedRewards[tierReward.reward]) {
      //           earnedRewards[tierReward.reward] = {
      //             quantity: 1,
      //             badgeUrl: tierReward.badge,
      //             label: tierReward.label,
      //           };
      //         } else {
      //           earnedRewards[tierReward.reward].quantity++;
      //         }

      //         foundReward = true;
      //         break;
      //       }
      //     }

      //     if (foundReward) {
      //       break;
      //     }
      //   }
      // }
    }
  );

  const rewardsProgresses = Object.entries(
    customerRewardsData["rewards"]["progresses"]
  )
    .filter((progressEntry: [any, any]) => {
      return customerRewardsTierData[progressEntry[0]];
    })
    .map((progressEntry: [any, any]) => {
      return {
        badges: customerRewardsTierData[progressEntry[0]].map(
          (rewardsData: any) => {
            return {
              label: rewardsData.label,
              badgeUrl: rewardsData.badge,
            };
          }
        ),
        bookedDaysTilReward:
          Number(progressEntry[0]) - progressEntry[1].number_of_bookings,
      };
    });

  const compiledRewardsData = {
    earnedRewards,
    rewardsProgresses,
  };

  return compiledRewardsData;
}

export async function fetchUserChatConversation(
  userId: string,
  conversationId: string
) {
  const response = await fetch(`${getUserChatMessagesApiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify({
      user_id: userId,
      conversation_id: conversationId,
    }),
  });
  const data = await response.json();

  return data;
}

export async function fetchUserChatConversationIds(
  userId: string,
  include?: string
) {
  const response = await fetch(`${getUserChatConversationIdsApiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify({
      user_id: userId,
      include: include,
    }),
  });
  const data = await response.json();

  return data;
}

export async function sendUserChatMessage(
  conversationId: string | null,
  message: string,
  senderId: string,
  senderName?: string,
  recipientId?: string,
  conversationLabel?: string
) {
  const responseBody: {
    message: string;
    sender_id: string;
    conversation_id: string | null;
    recipient_id?: string;
    sender_name?: string;
    conversation_label?: string;
  } = {
    message: message,
    sender_id: senderId,
    conversation_id: conversationId,
  };

  if (recipientId) {
    responseBody["recipient_id"] = recipientId;
  }

  if (senderName) {
    responseBody["sender_name"] = senderName;
  }

  if (conversationLabel) {
    responseBody["conversation_label"] = conversationLabel;
  }

  const response = await fetch(`${sendUserChatMessageApiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify(responseBody),
  });

  const data = await response.json();

  return data;
}

export async function updatePropertyRatings(
  propertyPageSlug: string,
  ratings: {
    [key: string]: RatingSendData;
    accuracy_rating?: RatingSendData;
    location_rating?: RatingSendData;
    check_in_rating?: RatingSendData;
    cleanliness_rating?: RatingSendData;
    support_rating?: RatingSendData;
    value_rating?: RatingSendData;
  },
  rater_id?: string,
  order_id?: string
) {
  let requestBody: any = {
    property_slug: propertyPageSlug,
    ...ratings,
  };

  if (rater_id) {
    requestBody["rater_id"] = rater_id;
  }

  if (order_id) {
    requestBody["rating_id"] = order_id;
  }

  console.log({ requestBody });

  const response = await fetch(`${propertyUpdateRatingsApiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify(requestBody),
  });

  const responseData = response.json();

  return responseData;
}

export async function updateCustomerOrderReview(
  propertySlug: string,
  orderId: string,
  reviewerId: string,
  theReview: string
) {
  const requestBody = {
    property_slug: propertySlug,
    order_id: orderId,
    reviewer_id: reviewerId,
    the_review: theReview,
  };

  const response = await fetch(`${updateCustomerOrderReviewApiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify(requestBody),
  });
  const responseData = response.json();

  return responseData;
}
