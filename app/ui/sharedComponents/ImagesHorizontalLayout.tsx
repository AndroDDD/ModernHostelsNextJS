import React from "react";
import Image from "next/image";

type ImagesHorizontalLayoutParameters = {
  imageUrls: string[];
  classNames: {
    section1Image: string;
    section2Image: string;
    section2ImageFirst: string;
    section2ImageSecond: string;
  };
};

const ImagesHorizontalLayout = ({
  imageUrls,
  classNames,
}: ImagesHorizontalLayoutParameters) => {
  let imagesLayoutArray = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const isOneImageBox = i % 3 === 0 ? true : false;

    if (isOneImageBox) {
      imagesLayoutArray.push(
        imageUrls[i] ? (
          <div
            key={`horizontal-layout-image-${i}`}
            className={classNames.section1Image}
          >
            <Image src={imageUrls[i]} width={750} height={750} alt="" />
          </div>
        ) : (
          <></>
        )
      );
    } else {
      imagesLayoutArray.push(
        <div
          key={`horizontal-layout-images-1-${i}`}
          className={classNames.section2Image}
        >
          {imageUrls[i] ? (
            <div className={classNames.section2ImageFirst}>
              <Image src={imageUrls[i]} width={500} height={500} alt="" />
            </div>
          ) : (
            <></>
          )}

          {imageUrls[i + 1] ? (
            <div
              key={`horizontal-layout-images-2-${i}`}
              className={classNames.section2ImageSecond}
            >
              <Image src={imageUrls[i + 1]} width={500} height={500} alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>
      );

      i++;
    }
  }

  return imagesLayoutArray;
};

export { ImagesHorizontalLayout as default };
