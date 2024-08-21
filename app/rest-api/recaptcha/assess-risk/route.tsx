import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const recaptchaToken = requestBody.recaptchaToken;
    const siteKey = requestBody.siteKey;
    const assessData = {
      event: {
        token: recaptchaToken,
        expectedAction: "INQUIRY",
        siteKey: siteKey,
      },
    };

    const assessmentResponse = await fetch(
      "https://recaptchaenterprise.googleapis.com/v1/projects/email-api-427822/assessments?key=AIzaSyAbWmbzVZofmDD9RjzDaqaVlJdJOGnkxg0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assessData),
      }
    );

    const assessmentJson = await assessmentResponse.json();

    return Response.json(assessmentJson);
  } catch (error: any) {
    return Response.json({
      error: error,
      message: error.message,
      status: 500,
    });
  }
}
