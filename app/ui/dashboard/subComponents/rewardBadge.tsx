"use client";

import { RewardProgressData } from "@/app/types/rewardsData";
import "@/app/ui/styles/scss/components/dashboard/sub-components/reward-badge.scss";

export default function RewardBadge({
  rewardProgress,
  rewardProgressIndex,
}: {
  rewardProgress: RewardProgressData;
  rewardProgressIndex: number | null;
}) {
  return (
    <div
      key={`kst-dashboard-reward-progress${
        rewardProgressIndex ? `-${rewardProgressIndex}` : ""
      }}`}
      className="kst-dashboard-rewards-sub-section-list-item progress"
    >
      <div className="kst-dashboard-list-item-progress">
        <span>{rewardProgress.bookedDaysTilReward}</span>
        {` booking${
          rewardProgress.bookedDaysTilReward === 1 ? "" : "s"
        } left to earn reward!`}
      </div>

      <div className="kst-dashboard-list-item-img-list">
        {rewardProgress.badges.map((badgeData, badgeIndex) => (
          <div
            key={`kst-dashboard-reward-progress-badge${
              rewardProgressIndex ? `-${rewardProgressIndex}` : ""
            }-${badgeIndex}`}
            className="kst-dashboard-list-item-img-container"
          >
            <img src={badgeData.badgeUrl} />
          </div>
        ))}
      </div>

      <div className="kst-dashboard-reward-progress-badge-list">
        {rewardProgress.badges.map((badgeData, badgeIndex) => (
          <div
            key={`kst-dashboard-reward-progress-badge-label${
              rewardProgressIndex ? `-${rewardProgressIndex}` : ""
            }-${badgeIndex}`}
            className="kst-dashboard-list-item-label"
          >
            {badgeData.label}
          </div>
        ))}
      </div>
    </div>
  );
}
