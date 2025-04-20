"use client";

import React, { useEffect, useState } from "react";

import { fetchFooterSeparatorImageURL } from "@/app/generalFunctions/apiDataFetches/fetchFooterSeparatorImage";

import "@/app/ui/styles/scss/components/shared-components/footer-separator-section.scss";

type FooterSeparatorSectionParameters = {
  style?: string;
};

export default ({
  style,
  isMobile,
}: FooterSeparatorSectionParameters & { isMobile: boolean }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>();

  useEffect(() => {
    (async () => {
      const separatorImageURL = await fetchFooterSeparatorImageURL();
      console.log({ separatorImageURL });
      setBackgroundImage(separatorImageURL);
    })();
  }, []);

  return (
    <section
      id="kst-home-footer-separator-section"
      className={style ? style : ""}
      style={
        isMobile
          ? { height: "50vh", background: `url("${backgroundImage}")` }
          : { background: `url("${backgroundImage}")` }
      }
    >
      <div
        className={`kst-home-footer-separator-section-background-support ${
          style ? style : ""
        }`}
      ></div>
    </section>
  );
};
