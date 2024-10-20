"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";

import { DesktopHeaderParameters } from "@/app/types/desktopHeaderParameters";
import { findValidClassnameInParentElements } from "@/app/generalFunctions/findValidClassnameInParentElements";
import "@/app/ui/styles/scss/components/header-and-footer/header/desktop-header.scss";

export default ({ isScrolled, content, style }: DesktopHeaderParameters) => {
  const { user } = useUser();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState({
    dropdownMenu1: false,
    dropdownMenu2: false,
    phoneInfo: false,
    emailInfo: false,
  });

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const restrictedClassnames = [
        "kst-desktop-header-navigation-browse-rentals",
        "kst-desktop-header-navigation-list-rentals",
      ];
      const eventElement = event.target as HTMLDivElement;
      const eventElementClassName =
        findValidClassnameInParentElements(eventElement);
      const isElementValid = !restrictedClassnames.find(
        (className) =>
          className === eventElementClassName.slice(0, className.length)
      );

      if (isElementValid) {
        toggleBrowseRentalsDropdownMenu(setIsOpen, "false");
        toggleListRentalsDropdownMenu(setIsOpen, "false");
      }
    });
  }, []);

  return (
    <header
      id="kst-desktop-header"
      className={`${isScrolled ? "isScrolled" : ""} ${style ? style : ""}`}
    >
      {content ? (
        <>
          <Link
            className={`kst-desktop-header-home-link ${style ? style : ""}`}
            href={`/`}
          >
            {content.homeButton.imgUrl.length > 0 ? (
              <Image
                className={`kst-desktop-header-home-link-img ${
                  style ? style : ""
                }`}
                src={content.homeButton.imgUrl}
                width={250}
                height={250}
                alt="homepage button"
              />
            ) : (
              content.homeButton.text
            )}
          </Link>

          <div
            className={`kst-desktop-header-navigation ${
              isScrolled ? "isScrolled" : ""
            } ${style ? style : ""}`}
          >
            <div
              className={`kst-desktop-header-navigation-browse-rentals ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-desktop-header-navigation-browse-rentals-button ${
                  style ? style : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();

                  toggleBrowseRentalsDropdownMenu(setIsOpen);
                }}
              >
                <div
                  className={`kst-desktop-header-navigation-browse-rentals-title ${
                    style ? style : ""
                  }`}
                >
                  {content.dropdownMenu1.title}
                </div>

                <div
                  className={`kst-desktop-header-navigation-browse-rentals-toggle ${
                    style ? style : ""
                  }`}
                >
                  <i className="kst-desktop-header-navigation-browse-rentals-toggle-icon fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div
                className={`kst-desktop-header-navigation-browse-rentals-dropdown ${
                  style ? style : ""
                }`}
              >
                {content.dropdownMenu1.links.map((link, index) => (
                  <Link
                    key={`kst-header-dropdown-menu-${index}`}
                    href={link.href}
                    style={{ color: link.color }}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`kst-desktop-header-navigation-list-rentals ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-desktop-header-navigation-list-rentals-button ${
                  style ? style : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();

                  toggleListRentalsDropdownMenu(setIsOpen);
                }}
              >
                <div
                  className={`kst-desktop-header-navigation-list-rentals-title ${
                    style ? style : ""
                  }`}
                >
                  {content.dropdownMenu2?.title}
                </div>

                <div
                  className={`kst-desktop-header-navigation-list-rentals-toggle ${
                    style ? style : ""
                  }`}
                >
                  <i
                    className={`kst-desktop-header-navigation-list-rentals-toggle-icon fa-solid fa-chevron-down ${
                      style ? style : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`kst-desktop-header-navigation-list-rentals-dropdown ${
                  style ? style : ""
                }`}
              >
                {content.dropdownMenu2?.links.map((link, index) => (
                  <Link
                    key={`kst-header-dropdown-menu-2-link-${index}`}
                    href={link.href}
                    style={{ color: link.color }}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={content.middleLink.href}
              className={`kst-desktop-header-navigation-blog ${
                style ? style : ""
              }`}
            >
              {content.middleLink.text}
            </Link>

            <div
              className={`kst-desktop-header-navigation-contact ${
                style ? style : ""
              }`}
            >
              <div
                className={`kst-desktop-header-navigation-call ${
                  style ? style : ""
                }`}
              >
                <i
                  className={`fa-solid fa-phone ${style ? style : ""}`}
                  onClick={(event) => {
                    setIsOpen((prevIsOpen) => {
                      let phoneToggleElement = event.target as HTMLElement;
                      let phoneInfoElement = phoneToggleElement.parentElement
                        ?.children[1] as HTMLDivElement;
                      let emailElement = phoneToggleElement.parentElement
                        ?.parentElement?.children[1] as HTMLDivElement;
                      let emailToggleElement = emailElement
                        .children[0] as HTMLDivElement;
                      let emailInfoElement = emailElement
                        .children[1] as HTMLDivElement;

                      prevIsOpen.phoneInfo = true;
                      prevIsOpen.emailInfo = false;

                      phoneToggleElement.style.display = "none";
                      phoneInfoElement.style.display = "flex";
                      phoneInfoElement.style.color = "whitesmoke";
                      emailToggleElement.style.display = "flex";
                      emailInfoElement.style.display = "none";
                      emailInfoElement.style.color = "rgba(0, 0, 0, 0)";

                      return prevIsOpen;
                    });
                  }}
                ></i>

                <a
                  href={`tel:${content.contact.phone}`}
                  className={`kst-desktop-header-navigation-call-info ${
                    style ? style : ""
                  }`}
                >
                  {content.contact.phone}
                </a>
              </div>

              <div
                className={`kst-desktop-header-navigation-email ${
                  style ? style : ""
                }`}
              >
                <i
                  className={`fa-solid fa-envelope ${style ? style : ""}`}
                  onClick={(event) => {
                    setIsOpen((prevIsOpen) => {
                      let emailToggleElement = event.target as HTMLElement;
                      let emailInfoElement = emailToggleElement.parentElement
                        ?.children[1] as HTMLDivElement;
                      let phoneElement = emailToggleElement.parentElement
                        ?.parentElement?.children[0] as HTMLDivElement;
                      let phoneToggleElement = phoneElement
                        .children[0] as HTMLDivElement;
                      let phoneInfoElement = phoneElement
                        .children[1] as HTMLDivElement;

                      prevIsOpen.phoneInfo = false;
                      prevIsOpen.emailInfo = true;

                      phoneToggleElement.style.display = "flex";
                      phoneInfoElement.style.display = "none";
                      phoneInfoElement.style.color = "rgba(0, 0, 0, 0)";
                      emailToggleElement.style.display = "none";
                      emailInfoElement.style.display = "flex";
                      emailInfoElement.style.color = "whitesmoke";

                      return prevIsOpen;
                    });
                  }}
                ></i>

                <a
                  href={`mailto:${content.contact.email}`}
                  className={`kst-desktop-header-navigation-email-info ${
                    style ? style : ""
                  }`}
                >
                  {content.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div
            className={`kst-desktop-header-login-signup ${style ? style : ""}`}
          >
            {user ? (
              <>
                <Link
                  href={`/dashboard`}
                  className={`kst-desktop-header-dashboard ${
                    style ? style : ""
                  }`}
                >
                  Dashboard
                </Link>
                <div
                  className={`kst-desktop-header-logout ${style ? style : ""}`}
                  onClick={(event) => {
                    const handleLogout = () => {
                      const returnTo = window.location.pathname; // Save the current URL
                      router.push(
                        `/rest-api/authentication/logout?returnTo=${encodeURIComponent(
                          returnTo
                        )}`
                      );
                    };

                    handleLogout();
                  }}
                >
                  {"Logout"}
                </div>
              </>
            ) : (
              <>
                <div
                  className={`kst-desktop-header-login ${style ? style : ""}`}
                  onClick={(event) => {
                    const handleLogin = () => {
                      const returnTo = window.location.pathname; // Save the current URL
                      router.push(
                        `/rest-api/authentication/login?returnTo=${encodeURIComponent(
                          returnTo
                        )}`
                      );
                    };

                    handleLogin();
                  }}
                >
                  {"Login"}
                </div>

                <div
                  className={`kst-desktop-header-signup ${style ? style : ""}`}
                  onClick={(event) => {
                    const handleSignup = () => {
                      const returnTo = window.location.pathname; // Save the current URL
                      router.push(
                        `/rest-api/authentication/signup?returnTo=${encodeURIComponent(
                          returnTo
                        )}`
                      );
                    };

                    handleSignup();
                  }}
                >
                  {"Sign Up"}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </header>
  );
};

const toggleBrowseRentalsDropdownMenu = (
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      dropdownMenu1: boolean;
      dropdownMenu2: boolean;
      phoneInfo: boolean;
      emailInfo: boolean;
    }>
  >,
  isOpen?: string
) => {
  let browseRentalsButtonElement = document.getElementsByClassName(
    "kst-desktop-header-navigation-browse-rentals-button"
  )[0];

  setIsOpen((prevIsOpen) => {
    prevIsOpen.dropdownMenu1 = isOpen
      ? isOpen === "true"
        ? true
        : false
      : !prevIsOpen.dropdownMenu1;

    const arrowToggleElement = browseRentalsButtonElement.children[1]
      .firstChild as HTMLElement;
    const dropdownListElement = browseRentalsButtonElement.parentElement
      ?.children[1] as HTMLDivElement;
    const menu2arrowToggleElement = browseRentalsButtonElement.parentElement
      ?.parentElement?.children[1].children[0].children[1]
      .firstChild as HTMLElement;
    const menu2dropdownListElement = browseRentalsButtonElement.parentElement
      ?.parentElement?.children[1].children[1] as HTMLDivElement;

    if (prevIsOpen.dropdownMenu1) {
      arrowToggleElement.style.transform = "rotate(180deg)";
      dropdownListElement.classList.add("is-open");
      menu2arrowToggleElement.style.transform = "";
      menu2dropdownListElement.classList.remove("is-open");
      prevIsOpen.dropdownMenu2 = false;
    } else {
      arrowToggleElement.style.transform = "";
      dropdownListElement.classList.remove("is-open");
    }

    return prevIsOpen;
  });
};

const toggleListRentalsDropdownMenu = (
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      dropdownMenu1: boolean;
      dropdownMenu2: boolean;
      phoneInfo: boolean;
      emailInfo: boolean;
    }>
  >,
  isOpen?: string
) => {
  let listRentalsButtonElement = document.getElementsByClassName(
    "kst-desktop-header-navigation-list-rentals-button"
  )[0];

  setIsOpen((prevIsOpen) => {
    prevIsOpen.dropdownMenu2 = isOpen
      ? isOpen === "true"
        ? true
        : false
      : !prevIsOpen.dropdownMenu2;

    const arrowToggleElement = listRentalsButtonElement.children[1]
      .firstChild as HTMLElement;
    const dropdownListElement = listRentalsButtonElement.parentElement
      ?.children[1] as HTMLDivElement;
    const menu1arrowToggleElement = listRentalsButtonElement.parentElement
      ?.parentElement?.children[0].children[0].children[1]
      .firstChild as HTMLElement;
    const menu1dropdownListElement = listRentalsButtonElement.parentElement
      ?.parentElement?.children[0].children[1] as HTMLDivElement;

    if (prevIsOpen.dropdownMenu2) {
      arrowToggleElement.style.transform = "rotate(180deg)";
      dropdownListElement.classList.add("is-open");
      menu1arrowToggleElement.style.transform = "";
      menu1dropdownListElement.classList.remove("is-open");
      prevIsOpen.dropdownMenu1 = false;
    } else {
      arrowToggleElement.style.transform = "";
      dropdownListElement.classList.remove("is-open");
    }

    return prevIsOpen;
  });
};
