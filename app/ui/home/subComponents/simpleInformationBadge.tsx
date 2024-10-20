import Image from "next/image";

import { SimpleInformationData } from "@/app/types/simpleInformationData";

import "@/app/ui/styles/scss/components/home/sub-components/simple-information-badge.scss";

type TSimpleInformationBadge = {
  simpleInformation: SimpleInformationData;
};

const SimpleInformationBadge: React.FC<TSimpleInformationBadge> = ({
  simpleInformation,
}) => {
  return (
    <div className="kst-simple-information-badge">
      <div className="kst-simple-information-badge-image-container">
        <Image
          src={simpleInformation.imageUrl}
          width={500}
          height={500}
          alt=""
        />
      </div>

      <div className="kst-simple-information-badge-info">
        <div className="kst-simple-information-badge-info-title">
          {simpleInformation.title}
        </div>

        <div className="kst-simple-information-badge-info-content">
          {simpleInformation.information}
        </div>
      </div>
    </div>
  );
};

export { SimpleInformationBadge as default };
