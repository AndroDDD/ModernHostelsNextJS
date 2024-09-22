"use server";

import {
  updateCustomerApiUrl,
  customersDataApiUrl,
  customerOrdersApiUrl,
  customerRewardsApiUrl,
  customerRewardsTierApiUrl,
  getUserChatMessagesApiUrl,
  getUserChatConversationIdsApiUrl,
  sendUserChatMessageApiUrl,
} from "@/app/constants/wpApiUrl";

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
    headers: { "Content-Type": "application/json" },
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
    const updatedCustomerResponse = await fetch(`${updateCustomerApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const updatedCustomerJson = await updatedCustomerResponse.json();
    console.log({ updatedCustomerJson });

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
    }
  );
  const customerRewardsResponse = await fetch(`${customerRewardsApiUrl}`, {
    headers: {
      "Content-Type": "application/json",
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
        | { dictionary_property: string | number; reward: string }
        | string
    ) => {
      if (
        typeof rewardData === "object" &&
        "dictionary_property" in rewardData
      ) {
        const tierRewardData = customerRewardsTierData[
          rewardData.dictionary_property
        ].find((tierRewardsData: any) => {
          return tierRewardsData.reward === rewardData.reward;
        });

        if (!earnedRewards[rewardData.reward]) {
          earnedRewards[rewardData.reward] = {
            quantity: 1,
            badgeUrl: tierRewardData?.badge ?? "",
            label: tierRewardData?.label ?? "",
          };
        } else {
          earnedRewards[rewardData.reward].quantity++;
        }
      } else if (typeof rewardData === "string") {
        const rewardTiersFlattened = Object.entries(customerRewardsTierData);

        for (let k = 0; k < rewardTiersFlattened.length; k++) {
          const rewardTier = rewardTiersFlattened[k];

          let foundReward = false;

          for (let i = 0; i < rewardTier[1].length; i++) {
            const tierReward = rewardTier[1][i];

            if (tierReward.reward === rewardData) {
              if (!earnedRewards[tierReward.reward]) {
                earnedRewards[tierReward.reward] = {
                  quantity: 1,
                  badgeUrl: tierReward.badge,
                  label: tierReward.label,
                };
              } else {
                earnedRewards[tierReward.reward].quantity++;
              }

              foundReward = true;
              break;
            }
          }

          if (foundReward) {
            break;
          }
        }
      }
    }
  );

  console.log({ earnedRewards });

  const rewardsProgresses = Object.entries(
    customerRewardsData["rewards"]["progresses"]
  ).map((progressEntry: [any, any]) => {
    console.log({
      badgeUrlTest: customerRewardsTierData[progressEntry[0]][0].badge,
    });

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
    },
    body: JSON.stringify(responseBody),
  });

  const data = await response.json();

  return data;
}
