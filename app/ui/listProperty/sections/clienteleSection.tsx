import Image from "next/image";

import { ClienteleSection } from "@/app/types/listPropertyPageData";
import "@/app/ui/styles/scss/components/list-property/sections/clientele-section.scss";

export default ({ title, statement, imgUrl, benefits }: ClienteleSection) => {
  return (
    <section id="kst-list-property-page-clientele-section">
      <div className="kst-list-property-page-clientele-section-header">
        <div className="kst-list-property-page-clientele-section-header-title">
          <span>{"03"}</span>

          {title}
        </div>

        <div className="kst-list-property-page-clientele-section-header-statement">
          {statement}
        </div>
      </div>

      <div className="kst-list-property-page-clientele-section-content">
        <div className="kst-list-property-page-clientele-section-image">
          <Image src={imgUrl} width={1000} height={1000} alt="" />
        </div>

        <div className="kst-list-property-page-clientele-section-benefits">
          {benefits.map((benefit) => (
            <div className="kst-list-property-page-clientele-section-benefit">
              <div className="kst-list-property-page-clientele-section-benefit-title">
                {benefit.title}
              </div>

              <div className="kst-list-property-page-clientele-section-benefit-statement">
                {benefit.statement}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
