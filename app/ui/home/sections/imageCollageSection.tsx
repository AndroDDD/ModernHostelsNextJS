"use client";
import React, { useEffect, useState } from "react";

import { CollageSectionData } from "@/app/types/collageSectionData";
import "@/app/ui/styles/scss/components/home/sections/image-collage-section.scss";

export default (passedProp: {
  imageCollageSectionData: CollageSectionData;
}) => {
  const collageSectionData = passedProp.imageCollageSectionData;

  return collageSectionData ? (
    <section id="kst-home-image-collage-section">
      <div className="kst-home-image-collage-section-header">
        <div className="kst-home-image-collage-section-header-title">
          {collageSectionData.header.title}
        </div>

        <div className="kst-home-image-collage-section-header-summary">
          {collageSectionData.header.summary}
        </div>
      </div>

      <div className="kst-home-image-collage-section-images">
        <div className="kst-home-image-collage-section-images-1">
          <img src={collageSectionData.images[0]} width="100%" height="100%" />
        </div>

        <div className="kst-home-image-collage-section-images-2">
          <img src={collageSectionData.images[1]} width="100%" height="100%" />
        </div>

        <div className="kst-home-image-collage-section-images-3">
          <img src={collageSectionData.images[2]} width="100%" height="100%" />
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};
