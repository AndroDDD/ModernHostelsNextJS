export const updateInformationCarouselScrollLocation = (
  informationCarouselElement: HTMLDivElement | null,
  byAmountOfPixels: number
) => {
  if (informationCarouselElement) {
    informationCarouselElement.scrollLeft += byAmountOfPixels;
  }
};
