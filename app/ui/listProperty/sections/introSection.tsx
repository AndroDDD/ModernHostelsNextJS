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
    (title || subTitle || statement) && (
      <section
        id="kst-list-property-page-intro-section"
        style={{
          backgroundImage: `url("${
            backgroundImageUrl ? backgroundImageUrl : ""
          }")`,
        }}
      >
        <div className="kst-list-property-page-intro-section-background-image-support"></div>

        <div className="kst-list-property-page-intro-section-text">
          {title && (
            <div className="kst-list-property-page-intro-section-title">
              {title}
            </div>
          )}

          {subTitle && (
            <div className="kst-list-property-page-intro-section-sub-title">
              {subTitle}
            </div>
          )}

          {statement && (
            <div className="kst-list-property-page-intro-section-statement">
              {statement}
            </div>
          )}
        </div>

        <div className="kst-list-property-page-intro-section-arrow">
          {fetchSVGIcon("downArrow")}
        </div>
      </section>
    )
  );
};

export const isIntroSectionRendered = ({
  title,
  subTitle,
  statement,
}: IntroSection) => {
  return title || subTitle || statement;
};
