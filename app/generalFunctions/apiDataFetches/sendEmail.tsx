"use server";

import { fetchOriginHeader } from "../devToPro/useDevOrigin";
import { emailServerUrl } from "@/app/constants/wpApiUrl";

export async function sendEmail({
  data,
  emailServer,
}: {
  data: { [key: string]: any };
  emailServer: number;
}) {
  if (!data) {
    return;
  }

  const requestData = {
    ...data,
    email_server: emailServer,
  };

  console.log({ emailServerUrl });
  const response = await fetch(emailServerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: fetchOriginHeader,
    },
    body: JSON.stringify(requestData),
  });
  const json = await response.json();
  console.log({ json });

  if (json.email_server_response && json.email_server_response.status === 200) {
    return true;
  } else {
    return false;
  }
}
