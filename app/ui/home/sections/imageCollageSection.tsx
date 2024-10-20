"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
          <Image
            src={collageSectionData.images[0]}
            width={1000}
            height={1000}
            alt=""
          />
        </div>

        <div className="kst-home-image-collage-section-images-2">
          <Image
            src={collageSectionData.images[1]}
            width={500}
            height={500}
            alt=""
          />
        </div>

        <div className="kst-home-image-collage-section-images-3">
          <Image
            src={collageSectionData.images[2]}
            width={500}
            height={500}
            alt=""
          />
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};
