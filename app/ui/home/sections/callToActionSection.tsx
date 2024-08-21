"use client";

import Link from "next/link";

import "@/app/ui/styles/scss/components/home/sections/call-to-action-section.scss";

export default (passedProp: {
  sectionData: {
    title: string;
    link: string;
    linkText: string;
    backgroundImage: string;
  };
}) => {
  const sectionData = passedProp["sectionData"];

  return (
    <section
      id="kst-home-call-to-action-section"
      style={
        sectionData
          ? { backgroundImage: `url("${sectionData.backgroundImage}")` }
          : {}
      }
    >
      {sectionData ? (
        <>
          <div className="kst-home-call-to-action-section-background-support"></div>
          <div className="kst-home-call-to-action-section-title">
            {sectionData.title}
          </div>
          <Link
            href={`${sectionData.link}`}
            className="kst-home-call-to-action-section-link"
          >
            {sectionData.linkText}
          </Link>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};
