import { MapSectionParameters } from "@/app/types/locationPageData";
import "@/app/ui/styles/scss/components/property-location/sections/map-section.scss";
import GoogleMapSection from "../../sharedComponents/map/mapSection";

export default ({ title, summary, latLong }: MapSectionParameters) => {
  return title && title.length > 0 && summary && summary.length > 0 ? (
    <section className="kst-property-location-map-section">
      <div className="kst-property-location-map-section-title-summary">
        <div className="kst-property-location-map-section-title">{title}</div>

        <div className="kst-property-location-map-section-summary">
          {summary}
        </div>
      </div>

      <div className="kst-property-location-map-section-map">
        <GoogleMapSection center={latLong} />
      </div>
    </section>
  ) : (
    <></>
  );
};
