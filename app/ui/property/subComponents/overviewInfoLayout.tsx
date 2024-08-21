import { OverviewSection } from "@/app/types/propertyPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import SnapshotBadge from "@/app/ui/property/subComponents/snapshotBadge";
import "@/app/ui/styles/scss/components/property/sub-components/overview-info-layout.scss";

export default ({
  headerTitle,
  snapShots,
  aboutTheSpace,
  amenitiesSummary,
  amenitiesList,
  workstationsSummary,
  workstationsList,
}: OverviewSection) => {
  return (
    <div
      className="kst-property-page-overview-info"
      style={
        amenitiesSummary.length === 0 &&
        workstationsSummary &&
        workstationsSummary.length === 0 &&
        workstationsList &&
        workstationsList.length === 0 &&
        amenitiesList.length === 0 &&
        snapShots.length === 0 &&
        aboutTheSpace.summary.length === 0
          ? { display: "none" }
          : {}
      }
    >
      <div className="kst-property-page-overview-info-title">{headerTitle}</div>

      <div className="kst-property-page-overview-info-snapshots">
        {snapShots.map((snapshot) => (
          <div className="kst-property-page-overview-info-snapshot">
            <SnapshotBadge {...snapshot} />
          </div>
        ))}
      </div>

      <div className="kst-property-page-overview-info-about-the-space">
        <div className="kst-property-page-overview-info-about-the-space-title">
          {aboutTheSpace.title}
        </div>

        <div className="kst-property-page-overview-info-about-the-space-summary">
          {aboutTheSpace.summary}
        </div>
      </div>

      <div
        className="kst-property-page-overview-info-features"
        style={
          amenitiesSummary.length === 0 &&
          workstationsSummary &&
          workstationsSummary.length === 0 &&
          workstationsList &&
          workstationsList.length === 0 &&
          amenitiesList.length === 0
            ? { display: "none" }
            : {}
        }
      >
        <div className="kst-property-page-overview-info-features-header">
          {"Amenities"}
        </div>

        <div
          className="kst-property-page-overview-info-features-amenities-summary"
          style={amenitiesSummary.length === 0 ? { display: "none" } : {}}
        >
          <strong>{"Amenities: "}</strong>

          {amenitiesSummary}
        </div>

        <div
          className="kst-property-page-overview-info-features-workstation-summary"
          style={
            workstationsSummary && workstationsSummary.length === 0
              ? { display: "none" }
              : {}
          }
        >
          <strong>{"Workstations: "}</strong>

          {workstationsSummary}
        </div>

        <ul
          className="kst-property-page-overview-info-features-workstation-list"
          style={
            workstationsList && workstationsList.length === 0
              ? { display: "none" }
              : {}
          }
        >
          {workstationsList &&
            workstationsList.map((item, i) => (
              <li
                key={`kst-workstation-item-${i}`}
                className="kst-property-page-overview-info-features-workstation-list-item"
              >
                {item}
              </li>
            ))}
        </ul>

        <div
          className="kst-property-page-overview-info-features-amenities-list"
          style={amenitiesList.length === 0 ? { display: "none" } : {}}
        >
          {amenitiesList.map((item, i) => (
            <div
              key={`kst-amenity-item-${i}`}
              className="kst-property-page-overview-info-features-amenities-list-item"
            >
              <div className="kst-property-page-overview-info-features-amenities-list-item-icon">
                {fetchSVGIcon(item.icon)}
              </div>

              <div className="kst-property-page-overview-info-features-amenities-list-item-name">
                {item.itemDisplayText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
