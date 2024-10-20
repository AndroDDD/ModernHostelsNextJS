import Image from "next/image";

import { SimpleInformationData } from "@/app/types/simpleInformationData";
import "@/app/ui/styles/scss/components/list-property/sub-components/slide-component.scss";

const SlideComponent: React.FC<SimpleInformationData> = ({
  title,
  information,
  imageUrl,
}) => {
  return (
    <div className="kst-list-property-page-slide-component">
      {imageUrl ? (
        <div className="kst-list-property-page-slide-component-image">
          <Image src={imageUrl} height={500} width={500} alt="" />
        </div>
      ) : (
        <></>
      )}

      {title ? (
        <div className="kst-list-property-page-slide-component-title">
          {title}
        </div>
      ) : (
        <></>
      )}

      {imageUrl ? (
        <div className="kst-list-property-page-slide-component-info">
          {information}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { SlideComponent as default };
