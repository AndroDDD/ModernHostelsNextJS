"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import {
  InquiryFormSendData,
  InquiryFormParameters,
} from "@/app/types/listPropertyFormSendData";
import "@/app/ui/styles/scss/components/list-property/sections/inquiry-form.scss";
import { assessFormRisk } from "@/app/generalFunctions/apiDataFetches/processForm";
import { sendEmail } from "@/app/generalFunctions/apiDataFetches/sendEmail";
export default ({
  title,
  buttonText,
  backgroundImageUrl,
  fullName,
  email,
  phoneNumber,
  propertyAddress,
  setFormSendData,
  style,
  csrfToken,
}: InquiryFormParameters &
  InquiryFormSendData & { emailServerUrl: string; csrfToken: string }) => {
  const allFieldsVerified = useRef<boolean>(false);

  const processForm = async (formData: FormData) => {
    const siteKey =
      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITEKEY ||
      "no_recaptcha_site_key";

    console.log({
      siteKey,
    });

    grecaptcha.enterprise.ready(async () => {
      const recaptchaToken = await grecaptcha.enterprise.execute(siteKey, {
        action: "INQUIRY",
      });

      if (!recaptchaToken) {
        alert("Token not received");
        return;
      }

      const csrf_token = formData.get("_csrf");
      console.log({ csrf_token });

      const isFormSubmissionSafe = await assessFormRisk(
        recaptchaToken,
        siteKey
      );

      console.log({ isFormSubmissionSafe });

      if (!isFormSubmissionSafe) {
        console.log({ notSafe: "Please respect the website:)" });
        return;
      }

      const emailData = {
        full_name: (formData.get("full_name") as string) ?? "",
        reply_to: (formData.get("email") as string) ?? "",
        phone_number: (formData.get("phone_number") as string) ?? "",
        address: (formData.get("address") as string) ?? "",
      };

      const emailServer = 0;

      const emailSentSuccessfully = await sendEmail({
        data: emailData,
        emailServer,
      });

      if (emailSentSuccessfully) {
        console.log("Email sent successfully!");
        setFormSendData({
          fullName: "",
          email: "",
          phoneNumber: "",
          propertyAddress: "",
        });
        alert("Your inquiry has been sent successfully!");
      } else {
        console.log("Failed to send email!");
        alert("Failed to send your inquiry. Please try again later.");
      }
    });
  };

  useEffect(() => {
    let submitButton = document.getElementsByClassName(
      "kst-list-property-page-inquiry-form-submit-button"
    )[0] as HTMLDivElement;

    if (
      (!fullName || !email || !phoneNumber || !propertyAddress) &&
      allFieldsVerified.current
    ) {
      console.log("Please fill in all required fields");
      allFieldsVerified.current = false;
      submitButton.style.cursor = "not-allowed";
      return;
    } else if (
      fullName &&
      email &&
      phoneNumber &&
      propertyAddress &&
      !allFieldsVerified.current
    ) {
      console.log("all fields are verified");
      allFieldsVerified.current = true;
      submitButton.style.cursor = "pointer";
    }
  }, [fullName, email, phoneNumber, propertyAddress]);

  return (
    <form
      action={processForm}
      className={`kst-list-property-page-inquiry-form ${style ? style : ""}`}
      style={
        backgroundImageUrl
          ? { backgroundImage: `url("${backgroundImageUrl}")` }
          : {}
      }
    >
      <input type="hidden" name="_csrf" value={csrfToken} />
      <div
        className={`kst-list-property-page-inquiry-form-background-support ${
          style ? style : ""
        }`}
      ></div>

      <div
        className={`kst-list-property-page-inquiry-form-title ${
          style ? style : ""
        }`}
      >
        {title}
      </div>

      <input
        name="full_name"
        type={"text"}
        className={`kst-list-property-page-inquiry-form-full-name ${
          style ? style : ""
        }`}
        placeholder="Full Name"
        value={fullName}
        onChange={(event) => {
          event.preventDefault();

          const updatedValue = event.currentTarget.value;

          setFormSendData((prevSendData) => {
            return {
              ...prevSendData,
              fullName: updatedValue,
            };
          });
        }}
      ></input>

      <input
        name="email"
        type={"text"}
        className={`kst-list-property-page-inquiry-form-email ${
          style ? style : ""
        }`}
        placeholder="Email"
        value={email}
        onChange={(event) => {
          event.preventDefault();

          const updatedValue = event.currentTarget.value;

          setFormSendData((prevSendData) => {
            return {
              ...prevSendData,
              email: updatedValue,
            };
          });
        }}
      ></input>

      <input
        name="phone_number"
        type={"text"}
        className={`kst-list-property-page-inquiry-form-phone-number ${
          style ? style : ""
        }`}
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(event) => {
          event.preventDefault();

          const updatedValue = event.currentTarget.value;

          setFormSendData((prevSendData) => {
            return {
              ...prevSendData,
              phoneNumber: updatedValue,
            };
          });
        }}
      ></input>

      <input
        name="address"
        type={"text"}
        className={`kst-list-property-page-inquiry-form-property-address ${
          style ? style : ""
        }`}
        placeholder="Property Address"
        value={propertyAddress}
        onChange={(event) => {
          event.preventDefault();

          const updatedValue = event.currentTarget.value;

          setFormSendData((prevSendData) => {
            return {
              ...prevSendData,
              propertyAddress: updatedValue,
            };
          });
        }}
      ></input>

      <input
        type="submit"
        className={`kst-list-property-page-inquiry-form-submit-button ${
          style ? style : ""
        }`}
        value={buttonText}
      ></input>
    </form>
  );
};
