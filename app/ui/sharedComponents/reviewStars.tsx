import "@/app/ui/styles/scss/components/shared-components/review-stars.scss";

type TReviewStars = {
  numberOfStars: number;
};

const ReviewStars: React.FC<TReviewStars> = ({ numberOfStars }) => {
  const generateStars = () => {
    const starsRounded = Math.round(numberOfStars);

    let starIconsArray = [];

    for (let i = 0; i < starsRounded; i++) {
      starIconsArray.push(
        <div className="kst-property-page-review-star">
          <i className="fa-solid fa-star"></i>
        </div>
      );
    }

    return starIconsArray;
  };

  return (
    <div className="kst-property-page-review-stars">{generateStars()}</div>
  );
};

export { ReviewStars as default };
