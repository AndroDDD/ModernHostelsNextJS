"use client";

import React, { useEffect, useState, useRef } from "react";

import { HighlightsSectionData } from "@/app/types/highlightsSectionData";
import "@/app/ui/styles/scss/components/home/sections/highlight-section.scss";

export default (passedProp: {
  highlightSectionData: HighlightsSectionData;
  isMobile: boolean;
}) => {
  const highlightSectionData = passedProp.highlightSectionData;
  const isMobile = passedProp.isMobile;
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState<number>();

  const animatedSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightSectionData) {
      setCurrentHighlightIndex(0);

      const animatedSectionChildElements = animatedSectionRef.current
        ?.children as unknown as HTMLDivElement[];
      animatedSectionChildElements[0].innerHTML =
        highlightSectionData.highlights[0];
      animatedSectionChildElements[1].innerHTML =
        highlightSectionData.highlights[0];

      animatedSectionChildElements[0].style.top = "-72px";
      animatedSectionChildElements[1].style.top = "-72px";
    }
  }, []);

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;

    if (
      typeof currentHighlightIndex === "number" &&
      highlightSectionData &&
      highlightSectionData.highlights.length > 1
    ) {
      const nextHighlightIndex =
        currentHighlightIndex + 1 >= highlightSectionData.highlights.length
          ? 0
          : currentHighlightIndex + 1;

      timeOutId = setTimeout(() => {
        const animatedSectionChildElements = animatedSectionRef.current
          ?.children as unknown as HTMLDivElement[];
        animatedSectionChildElements[0].innerHTML =
          highlightSectionData.highlights[nextHighlightIndex];
        animatedSectionChildElements[0].style.transitionDuration = "5s";
        animatedSectionChildElements[1].style.transitionDuration = "5s";
        animatedSectionChildElements[0].style.top = "0px";
        animatedSectionChildElements[1].style.top = "0px";

        setTimeout(() => {
          animatedSectionChildElements[0].style.transitionDuration = "0s";
          animatedSectionChildElements[1].style.transitionDuration = "0s";
          animatedSectionChildElements[1].innerHTML =
            highlightSectionData.highlights[nextHighlightIndex];
          animatedSectionChildElements[0].style.top = isMobile
            ? "-144px"
            : "-72px";
          animatedSectionChildElements[1].style.top = isMobile
            ? "-144px"
            : "-72px";

          setCurrentHighlightIndex(nextHighlightIndex);
        }, 7000);
      }, 5000);
    }

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
  }, [currentHighlightIndex]);

  return (
    <section
      id="kst-home-highlight-section"
      style={
        highlightSectionData
          ? {
              backgroundImage: `url("${highlightSectionData.backgroundImageURL}")`,
            }
          : {}
      }
    >
      <div className="kst-home-highlight-section-background-gradient"></div>

      <div className="kst-home-highlight-section-top">
        <div className="kst-home-highlight-section-top-static">
          {highlightSectionData ? highlightSectionData.headerTitle : ""}
        </div>

        <div
          ref={animatedSectionRef}
          className="kst-home-highlight-section-top-animated"
        >
          <div className="kst-home-highlight-section-top-animated-next"></div>

          <div className="kst-home-highlight-section-top-animated-prev"></div>
        </div>
      </div>
    </section>
  );
};
