import { RatingData } from "../types/ratingsData";

export const calculateAverageRating = ($ratings: RatingData[]) => {
  if (!$ratings || $ratings.length === 0) {
    return 0;
  }

  let totalRatings = 0;

  $ratings.forEach((rating) => {
    totalRatings += Number(rating.rating);
  });

  return totalRatings / $ratings.length;
};
