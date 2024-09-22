"use server";

import { checkoutSubmitOrderApiUrl } from "@/app/constants/wpApiUrl";

type UpdateWPOrdersParameters = {
  user_id: string;
  full_name: string | undefined;
  reply_to: string | undefined;
  property: string;
  start_date: string;
  end_date: string;
  order_id: string;
};

export async function updateWPOrdersData(
  completedOrderData: UpdateWPOrdersParameters
) {
  const response = await fetch(checkoutSubmitOrderApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completedOrderData),
  });

  const json = await response.json();

  console.log({ json });
}
