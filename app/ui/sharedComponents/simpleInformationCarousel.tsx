import React, { useState, useEffect, useRef } from "react";

import {
  SimpleInformationData,
  SimpleInformationDataArray,
} from "@/app/types/simpleInformationData";
import { updateInformationCarouselScrollLocation } from "@/app/generalFunctions/updateInformationCarouselScrollLocation";

type SimpleInformationCarouselParameters = {
  slides: SimpleInformationDataArray;
  SlideComponent: React.FC<SimpleInformationData>;
  classnames: {
    container: string;
    slide: string;
  };
};

const SimpleInformationCarousel: React.FC<
  SimpleInformationCarouselParameters
> = ({ slides, SlideComponent, classnames }) => {
  const [carouselIntervalIds, setCarouselIntervalIds] = useState<
    (string | number | NodeJS.Timeout | undefined)[]
  >([]);
  const [carouselSectionPositionY, setCarouselSectionPositionY] =
    useState<number>();
  const [isCarouselActive, setIsCarouselActive] = useState<boolean>(false);

  const simpleInformationCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (event) => {
        const carouselSectionElement =
          simpleInformationCarouselRef.current?.parentElement;
        const carouselSectionScreenPosition =
          carouselSectionElement?.getBoundingClientRect();
        const carouselSectionPositionY = carouselSectionScreenPosition?.y;

        setCarouselSectionPositionY(carouselSectionPositionY);
      },
      true
    );

    setCarouselSectionPositionY(
      simpleInformationCarouselRef.current?.parentElement?.getBoundingClientRect()
        .y
    );
  }, []);

  useEffect(() => {
    const carouselSectionHeight =
      simpleInformationCarouselRef.current?.parentElement?.offsetHeight;

    if (
      carouselSectionHeight &&
      carouselSectionPositionY &&
      carouselSectionPositionY <= 0 &&
      carouselSectionPositionY > -carouselSectionHeight &&
      !isCarouselActive
    ) {
      setCarouselIntervalIds((previousTimeoutIds) => {
        const newTimeoutId = setInterval(() => {
          if (simpleInformationCarouselRef.current) {
            updateInformationCarouselScrollLocation(
              simpleInformationCarouselRef.current,
              1
            );
          }
        }, 25);

        let updatedTimeoutIds = previousTimeoutIds;
        updatedTimeoutIds.push(newTimeoutId);

        return updatedTimeoutIds;
      });

      setIsCarouselActive(true);
    } else if (
      carouselSectionPositionY &&
      carouselSectionHeight &&
      (carouselSectionPositionY > 0 ||
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
    }
  }, [carouselSectionPositionY]);

  return (
    <div ref={simpleInformationCarouselRef} className={classnames.container}>
      {slides.length > 0 ? (
        slides.map((simpleInformation) => {
          return (
            <div
              className={classnames.slide}
              onMouseOver={(event) => {
                event.preventDefault();

                if (isCarouselActive) {
                  setCarouselIntervalIds((timeoutIds) => {
                    timeoutIds.forEach((id) => {
                      clearInterval(id);
                    });
                    return [];
                  });
                }
              }}
              onMouseOut={(event) => {
                event.preventDefault();

                if (isCarouselActive) {
                  setCarouselIntervalIds((timeoutIds) => {
                    if (simpleInformationCarouselRef.current) {
                      const newTimeoutId = setInterval(() => {
                        updateInformationCarouselScrollLocation(
                          simpleInformationCarouselRef.current,
                          1
                        );
                      }, 100);
                      timeoutIds.push(newTimeoutId);
                      return timeoutIds;
                    }
                    return timeoutIds;
                  });
                }
              }}
            >
              <SlideComponent {...simpleInformation} />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export { SimpleInformationCarousel as default };
