"use client";
import { useRouter } from "next/navigation";

import { secureHTTPProtocol } from "@/app/generalFunctions/secureHTTPProtocol";
import { IntroSectionData } from "@/app/types/introSectionData";
import "@/app/ui/styles/scss/components/home/sections/intro-section.scss";

export default (passedProp: { introSectionData: IntroSectionData }) => {
  const introSectionData = passedProp.introSectionData;
  const router = useRouter();

  return (
    <>
      {introSectionData ? (
        <section
          id="kst-home-intro-section"
          style={{
            backgroundImage: `url("${secureHTTPProtocol(
              introSectionData.backgroundImageUrl
            )}")`,
          }}
        >
          <div className="kst-home-into-section-background-support"></div>

          <div className="kst-home-intro-section-center">
            <div className="kst-home-intro-section-center-title">
              {introSectionData.title}
            </div>

            <div className="kst-home-intro-section-center-info">
              {introSectionData.subText}
            </div>

            <div className="kst-home-intro-section-center-search">
              <div className="kst-home-intro-section-center-search-dropdown">
                <div
                  className="kst-home-intro-section-center-search-dropdown-button"
                  onClick={(event) => {
                    const listElement = event.currentTarget
                      .nextSibling as HTMLDivElement;

                    listElement.style.display =
                      listElement.style.display === "none" ? "grid" : "none";
                  }}
                >
                  {introSectionData.dropdownMenuTitle}
                </div>

                <div
                  className="kst-home-intro-section-center-search-dropdown-list"
                  style={{ display: "none" }}
                >
                  {introSectionData.dropdownMenuItems.map((item, itemIndex) => (
                    <div
                      key={`kst-home-intro-section-center-search-dropdown-list-item-${itemIndex}`}
                      className="kst-home-intro-section-center-search-dropdown-list-item"
                      onClick={(event) => {
                        const dropdownButtonTitleLink = event.currentTarget
                          .parentElement?.parentElement
                          ?.firstChild as HTMLDivElement;
                        const listElement = event.currentTarget
                          .parentElement as HTMLDivElement;

                        dropdownButtonTitleLink.innerText =
                          event.currentTarget.innerText;
                        listElement.style.display = "none";
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="kst-home-intro-section-center-search-button"
                onClick={(event) => {
                  console.log({ clicking: "clicking" });
                  const dropdownMenuButtonElement = event.currentTarget
                    .parentElement?.firstChild?.firstChild as HTMLDivElement;
                  const dropdownMenuButtonTitle =
                    dropdownMenuButtonElement.innerText;

                  let mapLocation =
                    dropdownMenuButtonTitle ===
                    introSectionData.dropdownMenuTitle
                      ? introSectionData.dropdownMenuItems[0].name
                      : dropdownMenuButtonTitle;
                  mapLocation = mapLocation.toLowerCase();
                  mapLocation = mapLocation.trim();
                  mapLocation = mapLocation.replace(/ /g, "-");

                  const mapPageUrl = `/map?market=${mapLocation}`;

                  router.push(mapPageUrl);
                }}
              >
                {introSectionData.rightButtonTitle}
              </div>
            </div>
          </div>

          {/* <div className="kst-home-intro-section-navigation-arrow">
            <i className="fa-solid fa-chevron-down"></i>
          </div> */}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};
