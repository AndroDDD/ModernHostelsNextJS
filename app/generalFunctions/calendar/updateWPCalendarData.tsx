"use server";

import { wpPropertyCalendarApiUrl } from "@/app/constants/wpApiUrl";
import { fetchOriginHeader } from "../devToPro/useDevOrigin";

export async function updateWPCalendarData(
  propertySlug: string,
  startDate: string,
  endDate: string,
  calendarSpaceId: string | null = null
) {
  const wpCalendarUpdateUrl = `${wpPropertyCalendarApiUrl}book-days/${propertySlug}`;

  const response = await fetch(wpCalendarUpdateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
      calendar_space_id: calendarSpaceId,
    }),
  });
  const json = await response.json();
  const updatedSuccessfully = json["updated_calendar"];

  return updatedSuccessfully;
}
