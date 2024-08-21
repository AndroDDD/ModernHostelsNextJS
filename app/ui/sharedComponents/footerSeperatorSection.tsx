import React from "react";

import "@/app/ui/styles/scss/components/shared-components/footer-separator-section.scss";

type FooterSeparatorSectionParameters = {
  style?: string;
};

export default ({
  style,
  isMobile,
}: FooterSeparatorSectionParameters & { isMobile: boolean }) => {
  return (
    <section
      id="kst-home-footer-separator-section"
      className={style ? style : ""}
      style={isMobile ? { height: "50vh" } : {}}
    >
      <div
        className={`kst-home-footer-separator-section-background-support ${
          style ? style : ""
        }`}
      ></div>
    </section>
  );
};
