import React from "react";

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
            <img src={imageUrls[i]} />
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
              <img src={imageUrls[i]} />
            </div>
          ) : (
            <></>
          )}

          {imageUrls[i + 1] ? (
            <div
              key={`horizontal-layout-images-2-${i}`}
              className={classNames.section2ImageSecond}
            >
              <img src={imageUrls[i + 1]} />
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
