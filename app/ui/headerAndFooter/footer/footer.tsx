"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { FooterData } from "@/app/types/footerData";
import { fetchFooterData } from "@/app/generalFunctions/apiDataFetches/fetchFooterData";
import { validateEmail } from "@/app/generalFunctions/validateEmail";
import { subscribeEmailToNewsletter } from "@/app/generalFunctions/subscribeEmailToNewsletter";
import "@/app/ui/styles/scss/components/header-and-footer/footer/footer.scss";

type FooterParameters = {
  style?: string;
};

export default ({ style }: FooterParameters) => {
  const [footerData, setFooterData] = useState<FooterData | undefined>();

  useEffect(() => {
    fetchFooterData().then((fetchedFooterData) => {
      setFooterData(fetchedFooterData);
    });
  }, []);

  return (
    <section
      id="kst-main-footer"
      className={`${footerData ? "" : "no-footer-data"} ${style ? style : ""}`}
    >
      {footerData ? (
        <>
          <div className={`kst-main-footer-content-1 ${style ? style : ""}`}>
            <div
              className={`kst-main-footer-content-1-newsletter-subscribe ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-main-footer-content-1-newsletter-subscribe-header ${
                  style ? style : ""
                }`}
              >
                {footerData.content1.subscribe.headerText}
              </div>

              <div
                className={`kst-main-footer-content-1-newsletter-subscribe-email ${
                  style ? style : ""
                }`}
              >
                <input
                  type="text"
                  className={`kst-main-footer-content-1-newsletter-subscribe-email-input ${
                    style ? style : ""
                  }`}
                  placeholder={footerData.content1.subscribe.inputPlaceholder}
                ></input>

                <div
                  className={`kst-main-footer-content-1-newsletter-subscribe-email-button ${
                    style ? style : ""
                  }`}
                  onClick={(event) => {
                    const emailInputValue = (
                      event.currentTarget.previousSibling as HTMLInputElement
                    ).value;
                    const isEmailValid = validateEmail(emailInputValue);
                    const selectedSubscriberTypeInput = Array.from(
                      document.getElementsByName(
                        "subscriber-type-option"
                      ) as unknown as HTMLInputElement[]
                    ).find((input) => input.checked === true);
                    const submitResponseElement =
                      document.getElementsByClassName(
                        "kst-main-footer-content1-newsletter-submit-response"
                      )[0] as HTMLDivElement;
                    const submitResponseTextElement =
                      document.getElementsByClassName(
                        "kst-main-footer-content1-newsletter-submit-response-text"
                      )[0] as HTMLDivElement;
                    const submitResponseButtonElement =
                      document.getElementsByClassName(
                        "kst-main-footer-content1-newsletter-submit-response-button"
                      )[0] as HTMLDivElement;

                    if (!isEmailValid) {
                      console.log("Please enter a valid email address");

                      submitResponseTextElement.innerText =
                        "Please enter a valid email address";
                      submitResponseButtonElement.innerText = "OK";
                      submitResponseElement.style.display = "flex";

                      return;
                    }

                    if (selectedSubscriberTypeInput === undefined) {
                      console.log("Please select a subscriber type");

                      submitResponseTextElement.innerText =
                        "Please select a subscriber type";
                      submitResponseButtonElement.innerText = "OK";
                      submitResponseElement.style.display = "flex";

                      return;
                    }

                    subscribeEmailToNewsletter(
                      emailInputValue,
                      selectedSubscriberTypeInput.value
                    );

                    submitResponseTextElement.innerText = `Thank you for subscribing!`;
                    submitResponseTextElement.style.fontSize = "18px";
                    submitResponseButtonElement.style.display = "none";
                    submitResponseElement.style.justifyContent = "center";
                    submitResponseElement.style.display = "flex";
                  }}
                >
                  {footerData.content1.subscribe.buttonText}
                </div>

                <div
                  className={`kst-main-footer-content1-newsletter-submit-response ${
                    style ? style : ""
                  }`}
                >
                  <div
                    className={`kst-main-footer-content1-newsletter-submit-response-text ${
                      style ? style : ""
                    }`}
                  ></div>

                  <div
                    className={`kst-main-footer-content1-newsletter-submit-response-button ${
                      style ? style : ""
                    }`}
                    onClick={(event) => {
                      const submitResponseElement = event.currentTarget
                        .parentElement as HTMLDivElement;

                      submitResponseElement.style.display = "none";
                    }}
                  ></div>
                </div>
              </div>

              <div
                className={`kst-main-footer-content-1-newsletter-subscribe-subscriber-type ${
                  style ? style : ""
                }`}
              >
                <div
                  key={`kst-footer-newsletter-subscription-label`}
                  className={`kst-main-footer-content-1-newsletter-subscribe-subscriber-type-label ${
                    style ? style : ""
                  }`}
                >
                  {footerData.content1.subscribe.extra.labelText}
                </div>

                {footerData.content1.subscribe.extra.options.map(
                  (option, index) => (
                    <div
                      key={`kst-footer-newsletter-subscription-option-${index}`}
                      className={`kst-main-footer-content-1-newsletter-subscribe-subscriber-type-option ${
                        style ? style : ""
                      }`}
                    >
                      <input
                        name="subscriber-type-option"
                        type="radio"
                        value={option}
                      ></input>
                      <label htmlFor="subscriber-type-option">{option}</label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div
              className={`kst-main-footer-content-1-connect ${
                style ? style : ""
              }`}
            >
              <div
                key={`kst-footer-connect-label`}
                className={`kst-main-footer-content-1-connect-header ${
                  style ? style : ""
                }`}
              >
                {footerData.content1.connectHeader}
              </div>

              {footerData.content1.connectLinks.map((link, index) => (
                <a
                  key={`kst-footer-connect-link-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`kst-main-footer-content-1-connect-link ${
                    style ? style : ""
                  }`}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className={`kst-main-footer-content-2 ${style ? style : ""}`}>
            <div
              className={`kst-main-footer-content-2-header ${
                style ? style : ""
              }`}
            >
              {footerData.content2.headerText}
            </div>

            <div
              className={`kst-main-footer-content-2-links ${
                style ? style : ""
              }`}
            >
              {footerData.content2.links.map((link, index) => (
                <Link
                  key={`kst-footer-content-2-link-${index}`}
                  href={link.href}
                  className={`kst-main-footer-content-2-links-link ${
                    style ? style : ""
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className={`kst-main-footer-content-3 ${style ? style : ""}`}>
            <div
              className={`kst-main-footer-content-3-box-1 ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-main-footer-content-3-box-1-header ${
                  style ? style : ""
                }`}
              >
                {footerData.content3.box1.headerText}
              </div>

              <div
                className={`kst-main-footer-content-3-box-1-links ${
                  style ? style : ""
                }`}
              >
                {footerData.content3.box1.links.map((link, index) => (
                  <Link
                    key={`kst-footer-content-3-box-1-link-${index}`}
                    href={link.href}
                    className={`kst-main-footer-content-3-box-1-links-link ${
                      style ? style : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`kst-main-footer-content-3-box-2 ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-main-footer-content-3-box-2-header ${
                  style ? style : ""
                }`}
              >
                {footerData.content3.box2.headerText}
              </div>

              <div
                className={`kst-main-footer-content-3-box-2-links ${
                  style ? style : ""
                }`}
              >
                {footerData.content3.box2.links.map((link, index) => (
                  <Link
                    key={`kst-footer-content-3-box-2-link-${index}`}
                    href={link.href}
                    className={`kst-main-footer-content-3-box-2-links-link ${
                      style ? style : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};
