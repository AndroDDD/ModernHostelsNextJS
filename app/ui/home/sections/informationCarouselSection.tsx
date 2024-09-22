"use client";
import React, { useState, useEffect, useRef } from "react";

import { SimpleInformationDataArray } from "@/app/types/simpleInformationData";
import { updateInformationCarouselScrollLocation } from "@/app/generalFunctions/updateInformationCarouselScrollLocation";
import SimpleInformationBadge from "../subComponents/simpleInformationBadge";
import "@/app/ui/styles/scss/components/home/sections/information-carousel-section.scss";

export default (passedProp: {
  simpleInformationArray: SimpleInformationDataArray;
  isMobile: boolean;
}) => {
  const isMobile = passedProp.isMobile;
  const simpleInformationArray = passedProp.simpleInformationArray;
  const [carouselIntervalIds, setCarouselIntervalIds] = useState<
    (string | number | NodeJS.Timeout | undefined)[]
  >([]);
  const [carouselSectionPositionY, setCarouselSectionPositionY] =
    useState<number>();
  const [isCarouselActive, setIsCarouselActive] = useState<boolean>(false);

  const informationCarouselContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackScrollPositionY = (event: Event) => {
      const carouselSectionElement =
        informationCarouselContentRef.current?.parentElement;
      const carouselSectionScreenPosition =
        carouselSectionElement?.getBoundingClientRect();
      const carouselSectionPositionY = carouselSectionScreenPosition?.y;

      setCarouselSectionPositionY(carouselSectionPositionY);
    };
    setCarouselSectionPositionY(
      informationCarouselContentRef.current?.parentElement?.getBoundingClientRect()
        .y
    );

    window.addEventListener("scroll", trackScrollPositionY, true);

    return () => {
      window.removeEventListener("scroll", trackScrollPositionY, true);
    };
  }, []);

  useEffect(() => {
    const carouselSectionHeight =
      informationCarouselContentRef.current?.parentElement?.offsetHeight;
    const carouselInitiatingPosition = isMobile ? 125 : 0;

    if (
      carouselSectionPositionY &&
      carouselSectionHeight &&
      carouselSectionPositionY <= carouselInitiatingPosition &&
      carouselSectionPositionY > -carouselSectionHeight &&
      !isCarouselActive
    ) {
      setCarouselIntervalIds((previousTimeoutIds) => {
        console.log({ previousTimeoutIds, carouselIntervalIds });

        let updatedTimeoutIds = previousTimeoutIds;
        const newTimeoutId = setInterval(() => {
          if (informationCarouselContentRef.current) {
            updateInformationCarouselScrollLocation(
              informationCarouselContentRef.current,
              1
            );
          }
        }, 100);

        updatedTimeoutIds.push(newTimeoutId);

        return updatedTimeoutIds;
      });

      setIsCarouselActive(true);
      console.log("activated carousel");
    } else if (
      carouselSectionHeight &&
      carouselSectionPositionY &&
      (carouselSectionPositionY > carouselInitiatingPosition ||
        carouselSectionPositionY < -carouselSectionHeight) &&
      isCarouselActive
    ) {
      setCarouselIntervalIds((previousTimeoutIds) => {
        previousTimeoutIds.forEach((id) => {
          clearInterval(id);
        });

        return [];
      });

      setIsCarouselActive(false);
      console.log("deactivated carousel");
    }

    console.log({
      carouselSectionHeight,
      carouselSectionPositionY,
      isCarouselActive,
    });
  }, [carouselSectionPositionY]);

  return (
    <section id="kst-home-information-carousel-section">
      <div className="kst-home-information-carousel-section-header">
        {"The Modern Hostel Difference"}
      </div>

      <div
        ref={informationCarouselContentRef}
        className="kst-home-information-carousel-section-content"
      >
        {simpleInformationArray && simpleInformationArray.length > 0 ? (
          simpleInformationArray.map(
            (simpleInformation, simpleInformationIndex) => {
              return (
                <div
                  key={`kst-home-information-carousel-section-content-badge-${simpleInformationIndex}`}
                  className="kst-home-information-carousel-section-content-badge"
                  onMouseEnter={(event) => {
                    if (isCarouselActive) {
                      setCarouselIntervalIds((intervalIds) => {
                        intervalIds.forEach((id) => {
                          clearInterval(id);
                        });
                        return [];
                      });
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (isCarouselActive) {
                      setCarouselIntervalIds((intervalIds) => {
                        const newIntervalId = setInterval(() => {
                          if (informationCarouselContentRef.current) {
                            updateInformationCarouselScrollLocation(
                              informationCarouselContentRef.current,
                              1
                            );
                          }
                        }, 100);

                        let updatedIntervalIds = intervalIds;
                        updatedIntervalIds.push(newIntervalId);

                        return updatedIntervalIds;
                      });
                    }
                  }}
                >
                  <SimpleInformationBadge
                    simpleInformation={simpleInformation}
                  />
                </div>
              );
            }
          )
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
