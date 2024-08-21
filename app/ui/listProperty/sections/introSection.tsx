import { IntroSection } from "@/app/types/listPropertyPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import "@/app/ui/styles/scss/components/list-property/sections/intro-section.scss";

export default ({
  title,
  subTitle,
  statement,
  backgroundImageUrl,
}: IntroSection) => {
  return (
    <section
      id="kst-list-property-page-intro-section"
      style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
    >
      <div className="kst-list-property-page-intro-section-background-image-support"></div>

      <div className="kst-list-property-page-intro-section-text">
        <div className="kst-list-property-page-intro-section-title">
          {title}
        </div>

        <div className="kst-list-property-page-intro-section-sub-title">
          {subTitle}
        </div>

        <div className="kst-list-property-page-intro-section-statement">
          {statement}
        </div>
      </div>

      <div className="kst-list-property-page-intro-section-arrow">
        {fetchSVGIcon("downArrow")}
      </div>
    </section>
  );
};
