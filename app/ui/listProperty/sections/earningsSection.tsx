import Image from "next/image";

import { EarningsSection } from "@/app/types/listPropertyPageData";
import "@/app/ui/styles/scss/components/list-property/sections/earnings-section.scss";

export default ({ title, statement, stats, statsImage }: EarningsSection) => {
  return (
    (title || statement || (stats && stats.length > 0) || statsImage) && (
      <section id="kst-list-property-page-earnings-section">
        <div className="kst-list-property-page-earnings-section-header">
          {title && (
            <div className="kst-list-property-page-earnings-section-header-title">
              <span>{"01"}</span>

              {title}
            </div>
          )}

          {statement && (
            <div className="kst-list-property-page-earnings-section-header-statement">
              {statement}
            </div>
          )}
        </div>

        <div className="kst-list-property-page-earnings-section-stats">
          <div className="kst-list-property-page-earnings-section-stats-list">
            {stats &&
              stats.map((stat) => (
                <div className="kst-list-property-page-earnings-section-stats-list-item">
                  <div className="kst-list-property-page-earnings-section-stats-list-item-title">
                    {stat.title}
                  </div>

                  <div className="kst-list-property-page-earnings-section-stats-list-item-statement">
                    {stat.statement}
                  </div>
                </div>
              ))}
          </div>

          <div className="kst-list-property-page-earnings-section-stats-image">
            {statsImage && (
              <Image src={statsImage} width={500} height={500} alt="" />
            )}
          </div>
        </div>
      </section>
    )
  );
};

export const isEarningsSectionRendered = ({
  title,
  statement,
  stats,
  statsImage,
}: EarningsSection) => {
  return title || statement || (stats && stats.length > 0) || statsImage;
};
