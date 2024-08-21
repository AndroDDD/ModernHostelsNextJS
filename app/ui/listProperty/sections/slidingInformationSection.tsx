import { SlidingInformationSection } from "@/app/types/listPropertyPageData";
import SimpleInformationCarousel from "@/app/ui/sharedComponents/simpleInformationCarousel";
import SlideComponent from "../subComponents/slideComponent";
import "@/app/ui/styles/scss/components/list-property/sections/sliding-information-section.scss";

export default ({ title, statement, info }: SlidingInformationSection) => {
  return (
    <section id="kst-list-property-page-sliding-information-section">
      <div className="kst-list-property-page-sliding-information-section-header">
        <div className="kst-list-property-page-sliding-information-section-header-title">
          <span>{"02"}</span>

          {title}
        </div>

        <div className="kst-list-property-page-sliding-information-section-header-statement">
          {statement}
        </div>
      </div>

      <SimpleInformationCarousel
        slides={info}
        classnames={{
          container:
            "kst-list-property-page-sliding-information-section-slider",
          slide: "kst-list-property-page-sliding-information-section-slide",
        }}
        SlideComponent={SlideComponent}
      />
    </section>
  );
};
