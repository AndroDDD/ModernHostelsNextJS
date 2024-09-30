export type RatingSendData =
  | {
      rater_id: string;
      rating_id: string;
      rating: number | string;
    }
  | undefined;

export type RatingData = {
  rater_id: string;
  rating_id: string;
  rating_date: string;
  rating: number | string;
};
