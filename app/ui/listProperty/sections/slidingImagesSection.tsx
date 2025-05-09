import { SlidingImagesSection } from "@/app/types/listPropertyPageData";
import SimpleInformationCarousel from "@/app/ui/sharedComponents/simpleInformationCarousel";
import SlideComponent from "../subComponents/slideComponent";
import "@/app/ui/styles/scss/components/list-property/sections/sliding-images-section.scss";

export default ({ title, statement, images }: SlidingImagesSection) => {
  return (
    (title || statement || (images && images.length > 0)) && (
      <section id="kst-list-property-page-sliding-images-section">
        <div className="kst-list-property-page-sliding-images-section-header">
          {title && (
            <div className="kst-list-property-page-sliding-images-section-header-title">
              <span>{"04"}</span>

              {title}
            </div>
          )}

          {statement && (
            <div className="kst-list-property-page-sliding-images-section-header-statement">
              {statement}
            </div>
          )}
        </div>

        {images && images.length > 0 && (
          <SimpleInformationCarousel
            slides={images.map((imageUrl) => ({
              title: "",
              information: "",
              imageUrl: imageUrl,
            }))}
            classnames={{
              container: "kst-list-property-page-sliding-images-section-slider",
              slide: "kst-list-property-page-sliding-images-section-slide",
            }}
            SlideComponent={SlideComponent}
          />
        )}
      </section>
    )
  );
};

export const isSlidingImagesSectionRendered = ({
  title,
  statement,
  images,
}: SlidingImagesSection) => {
  return title || statement || (images && images.length > 0);
};
