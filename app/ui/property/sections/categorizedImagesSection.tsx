"use client";
import React, { useEffect, useRef, useState } from "react";

import { CategorizedImagesSection } from "@/app/types/propertyPageData";
import ImagesHorizontalLayout from "@/app/ui/sharedComponents/ImagesHorizontalLayout";
import "@/app/ui/styles/scss/components/property/sections/categorized-images-section.scss";

export default (categorizedImages: CategorizedImagesSection) => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [hasImages, setHasImages] = useState<boolean>(false);

  let imagesCategoriesRef = useRef<HTMLDivElement>(null);
  let imagesDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCategorySelected = false;

    if (
      imagesCategoriesRef.current &&
      imagesCategoriesRef.current?.children.length > 0
    ) {
      return;
    }
    Object.keys(categorizedImages).forEach((categoryName, index) => {
      const numberOfImages = categorizedImages[categoryName].length;

      if (numberOfImages > 0) {
        setHasImages(true);
        let newCategoryElement = document.createElement("div");

        newCategoryElement.classList.add(
          "kst-property-page-categorized-images-section-category"
        );

        newCategoryElement.innerHTML = categoryName;

        newCategoryElement.onclick = (event) => {
          event.preventDefault();

          let selectedCategoryElement = event.currentTarget as HTMLDivElement;
          let categoryElements = selectedCategoryElement.parentElement
            ?.children as unknown as HTMLDivElement[];

          for (let i = 0; i < categoryElements.length; i++) {
            categoryElements[i].style.color = "#aaa";
          }

          if (imagesDisplayRef.current) {
            imagesDisplayRef.current.scrollLeft = 0;
          }

          selectedCategoryElement.style.color = "#000";

          setSelectedCategory(categoryName);
        };

        if (imagesCategoriesRef.current) {
          imagesCategoriesRef.current.append(newCategoryElement);
        }
        if (!isCategorySelected) {
          newCategoryElement.style.color = "#000";

          setSelectedCategory(categoryName);
          isCategorySelected = true;
        }
      }
    });
  }, []);

  return (
    <section
      key={`kst-property=page-categorized-images-section`}
      id="kst-property-page-categorized-images-section"
      style={!hasImages ? { display: "none" } : {}}
    >
      <div
        ref={imagesCategoriesRef}
        className="kst-property-page-categorized-images-section-categories"
      ></div>

      <div
        ref={imagesDisplayRef}
        className="kst-property-page-categorized-images-section-images-display"
      >
        {selectedCategory ? (
          <ImagesHorizontalLayout
            imageUrls={categorizedImages[selectedCategory]}
            classNames={{
              section1Image:
                "kst-property-page-categorized-images-section-images-display-1-block",
              section2Image:
                "kst-property-page-categorized-images-section-images-display-2-block",
              section2ImageFirst:
                "kst-property-page-categorized-images-section-images-display-2-block-first",
              section2ImageSecond:
                "kst-property-page-categorized-images-section-images-display-2-block-second",
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
