"use server";

import { wpPropertyCalendarApiUrl } from "@/app/constants/wpApiUrl";

export async function updateWPCalendarData(
  propertySlug: string,
  startDate: string,
  endDate: string
) {
  const wpCalendarUpdateUrl = `${wpPropertyCalendarApiUrl}book-days/${propertySlug}`;

  const response = await fetch(wpCalendarUpdateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
    }),
  });
  const json = await response.json();
  const updatedSuccessfully = json["updated_calendar"];

  console.log({ updatedSuccessfully, propertySlug });

  return updatedSuccessfully;
}
