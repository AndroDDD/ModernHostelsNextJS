"use client";

import React, { useRef } from "react";
import Link from "next/link";

import { DesktopHeaderParameters } from "@/app/types/desktopHeaderParameters";
import "@/app/ui/styles/scss/components/header-and-footer/header/mobile-header.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default ({ content, headerRef }: DesktopHeaderParameters) => {
  const { user } = useUser();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const subMenu1Ref = useRef<HTMLDivElement>(null);
  const subMenu2Ref = useRef<HTMLDivElement>(null);

  return (
    <div id="kst-mobile-header">
      <div className="kst-mobile-header-top">
        <div
          className="kst-mobile-header-menu-toggle-button"
          onClick={(event) => {
            if (headerRef && headerRef.current) {
              const currentHeaderContainerHeight =
                headerRef.current.style.height;
              const currentMobileHeaderHeight =
                event.currentTarget.parentElement?.parentElement?.style.height;
              const currentMobileMenuDisplay =
                mobileMenuRef.current?.style.display;

              headerRef.current.style.height =
                currentHeaderContainerHeight === "100%" ? "auto" : "100%";

              if (event.currentTarget.parentElement?.parentElement) {
                event.currentTarget.parentElement.parentElement.style.height =
                  currentMobileHeaderHeight === "100%" ? "auto" : "100%";

                if (mobileMenuRef.current) {
                  mobileMenuRef.current.style.display =
                    currentMobileMenuDisplay === "flex" ? "none" : "flex";
                }
              }
            }
          }}
        >
          <div className="kst-mobile-header-menu-toggle-container">
            <div className="kst-mobile-header-menu-toggle">
              <i className="fa-solid fa-bars" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <Link href={`/`} className="kst-mobile-header-home">
          {content.homeButton.text}
        </Link>
      </div>

      <div ref={mobileMenuRef} className="kst-mobile-header-menu-container">
        <div className="kst-mobile-header-menu-container-contacts">
          <a
            href={`tel:${content.contact.phone}`}
            className={"kst-mobile-header-menu-container-contact"}
          >
            {content.contact.phone}
          </a>

          <a
            href={`mailto:${content.contact.email}`}
            className={"kst-mobile-header-menu-container-contact"}
          >
            {content.contact.email}
          </a>
        </div>

        <div className="kst-mobile-header-menu-container-main-links">
          <div
            className="kst-mobile-header-menu-container-main-link"
            onClick={(event) => {
              const currentDropdownMenuDisplay =
                subMenu1Ref.current?.style.display;

              if (subMenu1Ref.current) {
                subMenu1Ref.current.style.display =
                  currentDropdownMenuDisplay === "none" ? "grid" : "none";
              }
            }}
          >
            {content.dropdownMenu1.title}

            <div
              ref={subMenu1Ref}
              className="kst-mobile-header-menu-container-main-link-submenu"
              style={{ display: "none" }}
            >
              {content.dropdownMenu1.links.map((link) => (
                <Link
                  href={link.href}
                  className="kst-mobile-header-menu-container-main-link-submenu-item"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="kst-mobile-header-menu-container-main-link"
            onClick={(event) => {
              const currentDropdownMenuDisplay =
                subMenu2Ref.current?.style.display;

              if (subMenu2Ref.current) {
                subMenu2Ref.current.style.display =
                  currentDropdownMenuDisplay === "none" ? "grid" : "none";
              }
            }}
          >
            {content.dropdownMenu2?.title}

            <div
              ref={subMenu2Ref}
              className="kst-mobile-header-menu-container-main-link-submenu"
              style={{ display: "none" }}
            >
              {content.dropdownMenu2?.links.map((link) => (
                <Link
                  href={link.href}
                  className="kst-mobile-header-menu-container-main-link-submenu-item"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={content.middleLink.href}
            className="kst-mobile-header-menu-container-main-link"
          >
            {content.middleLink.text}
          </Link>
        </div>

        <div className="kst-mobile-header-menu-container-login-signup-links">
          {user ? (
            <>
              <Link
                className="kst-mobile-header-menu-container-dashboard"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <div
                className="kst-mobile-header-menu-container-logout"
                onClick={(event) => {
                  const handleLogout = () => {
                    const returnTo = window.location.pathname; // Save the current URL
                    router.push(
                      `/rest-api/authentication/log?returnTo=${encodeURIComponent(
                        returnTo
                      )}`
                    );
                  };

                  handleLogout();
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="kst-mobile-header-menu-container-login"
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
                className="kst-mobile-header-menu-container-signup"
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
      </div>
    </div>
  );
};
