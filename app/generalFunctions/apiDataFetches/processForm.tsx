"use server";

import { useHttpProtocol } from "../devToPro/useHttpProtocol";
import { fetchOriginHeader, useNextJSPort } from "../devToPro/useDevOrigin";

export const assessFormRisk = async (
  recaptchaToken: string,
  siteKey: string
) => {
  const assessmentResponse = await fetch(
    `${useHttpProtocol}${useNextJSPort}rest-api/recaptcha/assess-risk`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: fetchOriginHeader,
      },
      body: JSON.stringify({
        recaptchaToken,
        siteKey,
      }),
    }
  );
  const assessmentJson = await assessmentResponse.json();

  console.log({ assessmentJson });

  if (
    !assessmentJson ||
    !assessmentJson.riskAnalysis ||
    assessmentJson.riskAnalysis.score < 0.5
  ) {
    console.log("ReCaptcha failed. Please try again.");
    return false;
  } else {
    console.log("ReCaptcha successful");
    return true;
  }
};
