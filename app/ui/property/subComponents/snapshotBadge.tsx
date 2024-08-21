import { SnapshotBadgeData } from "@/app/types/snapshotBadgeData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import "@/app/ui/styles/scss/components/property/sub-components/snapshot-badge.scss";

export default ({ title, summary, icon }: SnapshotBadgeData) => {
  return (
    <div className="kst-snapshot-badge">
      <div className="kst-snapshot-badge-icon">{fetchSVGIcon(icon)}</div>

      <div className="kst-snapshot-badge-title-summary">
        <div className="kst-snapshot-badge-title">{title}</div>

        <div className="kst-snapshot-badge-summary">{summary}</div>
      </div>
    </div>
  );
};
