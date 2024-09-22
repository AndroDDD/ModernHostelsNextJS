import { OverviewSection } from "@/app/types/propertyPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import SnapshotBadge from "@/app/ui/property/subComponents/snapshotBadge";
import "@/app/ui/styles/scss/components/property/sub-components/overview-info-layout.scss";
import overviewSection from "../sections/overviewSection";

export default ({
  headerTitle,
  snapShots,
  aboutTheSpace,
  amenitiesSummary,
  amenitiesList,
  workstationsSummary,
  workstationsList,
  spaces,
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
        {snapShots.map((snapshot, snapshotIndex) => (
          <div
            key={`kst-property-page-overview-info-snapshot-${snapshotIndex}`}
            className="kst-property-page-overview-info-snapshot"
          >
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

      {spaces && spaces.length > 0 ? (
        <div className="kst-property-page-overview-info-spaces-section">
          <div className="kst-property-page-overview-info-spaces-title">
            {"Spaces"}
          </div>

          <div className="kst-property-page-overview-info-spaces">
            {spaces.map((space, spaceIndex) =>
              space.show_displays ? (
                <div
                  key={`kst-property-page-overview-info-space-${spaceIndex}`}
                  className="kst-property-page-overview-info-space"
                >
                  <div className="kst-property-page-overview-info-space-title">
                    {space.label}
                  </div>

                  {space.displays && space.displays.length > 0 ? (
                    <div className="kst-property-page-overview-info-space-displays">
                      {space.displays.map((display, displayIndex) => (
                        <div
                          key={`kst-property-page-overview-info-space-display-${displayIndex}`}
                          className="kst-property-page-overview-info-space-display"
                        >
                          <div className="kst-property-page-overview-info-space-display-title">
                            {display.title ?? "Space"}
                          </div>

                          {display.img_url ? (
                            <div className="kst-property-page-overview-info-space-display-img">
                              <img src={display.img_url} />
                            </div>
                          ) : (
                            <></>
                          )}

                          {display.description ? (
                            <div className="kst-property-page-overview-info-space-display-description">
                              {display.description}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div
                  key={`kst-property-page-overview-info-space-${spaceIndex}`}
                ></div>
              )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

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
