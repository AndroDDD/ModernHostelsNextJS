import React from "react";

export const handleVideoScroll = (
  event: Event,
  videoContainerElement: React.MutableRefObject<HTMLElement | null>
) => {
  const videoElement = videoContainerElement.current
    ?.firstChild as HTMLVideoElement;
  const videoHeight = videoElement.offsetHeight;
  const videoDuration = videoElement.duration;
  const containerScreenPosition =
    videoContainerElement.current?.getBoundingClientRect();
  const containerPositionY = containerScreenPosition?.y;
  const containerHeight = videoContainerElement.current?.offsetHeight;
  const containerHeightAndVideoHeightDifference = containerHeight
    ? containerHeight - videoHeight
    : 0;

  if (
    containerPositionY &&
    containerPositionY <= 0 &&
    -containerPositionY <= containerHeightAndVideoHeightDifference
  ) {
    const videoScrollPercentage =
      -containerPositionY / containerHeightAndVideoHeightDifference;
    const videoTime = videoDuration * videoScrollPercentage;

    videoElement.currentTime = videoTime;

    videoElement.play().then(() => {
      videoElement.pause();
    });
  }
};
