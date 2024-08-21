import Link from "next/link";

import { OtherLocationsSectionParameters } from "@/app/types/locationPageData";
import "@/app/ui/styles/scss/components/property-location/sections/other-locations-section.scss";

export default ({ title, locations }: OtherLocationsSectionParameters) => {
  return (
    <section
      className="kst-property-location-other-locations-section"
      style={locations.length === 0 ? { display: "none" } : {}}
    >
      <div className="kst-property-location-other-locations-section-title">
        {title}
      </div>

      <div className="kst-property-location-other-locations-section-links">
        {locations.map((location) => (
          <Link
            href={location.href}
            className="kst-property-location-other-locations-section-links-link"
          >
            {location.text}
          </Link>
        ))}
      </div>
    </section>
  );
};
