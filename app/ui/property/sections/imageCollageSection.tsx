import { ImageCollageSection } from "@/app/types/propertyPageData";
import ImagesHorizontalLayout from "@/app/ui/sharedComponents/ImagesHorizontalLayout";
import "@/app/ui/styles/scss/components/property/sections/image-collage-section.scss";

export default ({ imageUrls }: ImageCollageSection) => {
  return (
    <section
      id="kst-property-page-image-collage-section"
      style={imageUrls.length === 0 ? { display: "none" } : {}}
    >
      <ImagesHorizontalLayout
        imageUrls={imageUrls}
        classNames={{
          section1Image: "kst-property-page-image-collage-section-1-image",
          section2Image: "kst-property-page-image-collage-section-2-images",
          section2ImageFirst:
            "kst-property-page-image-collage-section-2-images-first",
          section2ImageSecond:
            "kst-property-page-image-collage-section-2-images-second",
        }}
      />
    </section>
  );
};
