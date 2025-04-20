import "@/app/ui/styles/scss/components/list-property/sections/single-review-section.scss";
import { SingleReviewSection } from "@/app/types/listPropertyPageData";

export default ({ from, statement, backgroundImage }: SingleReviewSection) => {
  return (
    (from || statement) && (
      <section
        id="kst-list-property-page-single-review-section"
        style={
          backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgb(29, 25, 25) 0%, rgba(29, 25, 25, 0.55) 51.56%, rgb(29, 25, 25) 100%),url("${backgroundImage}")`,
              }
            : {
                backgroundImage: ` linear-gradient(rgb(29, 25, 25) 0%, rgba(29, 25, 25, 0.55) 51.56%, rgb(29, 25, 25) 100%)`,
              }
        }
      >
        {statement && (
          <div className="kst-list-property-page-single-review-section-statement">
            {statement}
          </div>
        )}

        {from && (
          <div className="kst-list-property-page-single-review-section-from">
            {from}
          </div>
        )}
      </section>
    )
  );
};

export const isSingleReviewSectionRendered = ({
  from,
  statement,
  backgroundImage,
}: SingleReviewSection) => {
  return from || statement;
};
