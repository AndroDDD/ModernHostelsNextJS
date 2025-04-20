import { SlidingInformationSection } from "@/app/types/listPropertyPageData";
import SimpleInformationCarousel from "@/app/ui/sharedComponents/simpleInformationCarousel";
import SlideComponent from "../subComponents/slideComponent";
import "@/app/ui/styles/scss/components/list-property/sections/sliding-information-section.scss";

export default ({ title, statement, info }: SlidingInformationSection) => {
  return (
    (title || statement || (info && info.length > 0)) && (
      <section id="kst-list-property-page-sliding-information-section">
        <div className="kst-list-property-page-sliding-information-section-header">
          {title && (
            <div className="kst-list-property-page-sliding-information-section-header-title">
              <span>{"02"}</span>

              {title}
            </div>
          )}

          {statement && (
            <div className="kst-list-property-page-sliding-information-section-header-statement">
              {statement}
            </div>
          )}
        </div>

        {info && (
          <SimpleInformationCarousel
            slides={info}
            classnames={{
              container:
                "kst-list-property-page-sliding-information-section-slider",
              slide: "kst-list-property-page-sliding-information-section-slide",
            }}
            SlideComponent={SlideComponent}
          />
        )}
      </section>
    )
  );
};

export const isSlidingInformationSectionRendered = ({
  title,
  statement,
  info,
}: SlidingInformationSection) => {
  return title || statement || (info && info.length > 0);
};
