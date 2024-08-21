import "@/app/ui/styles/scss/components/list-property/sections/single-review-section.scss";
import { SingleReviewSection } from "@/app/types/listPropertyPageData";

export default ({ from, statement, backgroundImage }: SingleReviewSection) => {
  return (
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
      <div className="kst-list-property-page-single-review-section-statement">
        {statement}
      </div>

      <div className="kst-list-property-page-single-review-section-from">
        {from}
      </div>
    </section>
  );
};
