"use client";

import Link from "next/link";

import { SingleItemSectionParameters } from "@/app/types/singleItemSectionParameters";
import "@/app/ui/styles/scss/components/home/sections/single-item-section.scss";

export default ({
  itemData,
  direction,
  isMobile,
}: SingleItemSectionParameters & { isMobile: boolean }) => {
  return (
    <section
      className="kst-home-single-item-section"
      style={
        isMobile
          ? {}
          : direction === "ltr"
          ? { direction: "ltr" }
          : { direction: "rtl" }
      }
    >
      <div className="kst-home-single-item-section-image">
        <img
          src={itemData ? itemData.imageUrl : ""}
          width={"auto"}
          height={"auto"}
        />
      </div>

      <div
        className="kst-home-single-item-section-details"
        style={
          isMobile
            ? {}
            : direction === "ltr"
            ? { direction: "ltr" }
            : { direction: "rtl", marginLeft: "0px", marginRight: "25px" }
        }
      >
        <div className="kst-home-single-item-section-details-summary">
          {itemData ? itemData.summary : ""}
        </div>

        <div
          className="kst-home-single-item-section-details-links"
          style={
            isMobile
              ? {}
              : direction === "ltr"
              ? { direction: "ltr" }
              : { direction: "rtl" }
          }
        >
          <Link
            href={itemData ? itemData.viewItemLink.href : "/"}
            className="kst-home-single-item-section-details-links-view-item"
          >
            {itemData ? itemData.viewItemLink.text : "View Item"}
          </Link>

          <Link
            href={itemData ? itemData.viewCollectionLink.href : "/"}
            className="kst-home-single-item-section-details-links-view-collection"
          >
            {itemData ? itemData.viewCollectionLink.text : "View Collection"}
          </Link>
        </div>
      </div>
    </section>
  );
};
