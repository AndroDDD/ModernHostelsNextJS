"use client";

import React, { useEffect, useRef } from "react";

import { handleVideoScroll } from "@/app/generalFunctions/handleVideoScroll";
import { secureHTTPProtocol } from "@/app/generalFunctions/secureHTTPProtocol";
import "@/app/ui/styles/scss/components/home/sections/video-scroll-section.scss";

export default (passedProp: { scrollVideo: string }) => {
  const videoScrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollVideo = passedProp.scrollVideo;

  useEffect(() => {
    const handleVideoScrollTransversed = (event: Event) => {
      handleVideoScroll(event, videoScrollSectionRef);
    };

    window.addEventListener("scroll", handleVideoScrollTransversed, true);

    return () => {
      window.removeEventListener("scroll", handleVideoScrollTransversed, true);
    };
  }, []);

  return (
    <section ref={videoScrollSectionRef} id="kst-home-video-scroll-section">
      {scrollVideo ? (
        <video
          src={secureHTTPProtocol(scrollVideo)}
          playsInline
          preload="auto"
          muted
        >
          <source type="video/mp4" src={secureHTTPProtocol(scrollVideo)} />
        </video>
      ) : (
        <></>
      )}
    </section>
  );
};
