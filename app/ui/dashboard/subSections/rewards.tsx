"use client";

import { useState, useEffect } from "react";

import { RewardsData } from "@/app/types/rewardsData";
import { fetchCustomerRewards } from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import RewardBadge from "../subComponents/rewardBadge";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/rewards.scss";

type RewardsInterface = {
  customerId: string;
};

export default function Rewards({ customerId }: RewardsInterface) {
  const [rewardsData, setRewardsData] = useState<RewardsData>();

  useEffect(() => {
    fetchCustomerRewards(customerId).then((rewardsData) => {
      console.log({ rewardsData });
      setRewardsData(rewardsData);
    });
  }, []);

  return (
    <div id="kst-dashboard-rewards-section">
      {rewardsData ? (
        <>
          <div className="kst-dashboard-rewards-sub-section">
            <h1>REWARD PROGRESSES</h1>

            <div className="kst-dashboard-rewards-sub-section-list">
              {rewardsData.rewardsProgresses.map(
                (rewardProgress, rewardProgressIndex) => (
                  <RewardBadge
                    rewardProgress={rewardProgress}
                    rewardProgressIndex={rewardProgressIndex}
                  />
                )
              )}
            </div>
          </div>

          <div className="kst-dashboard-rewards-sub-section">
            <h1>EARNED REWARDS</h1>

            <div className="kst-dashboard-rewards-sub-section-list">
              {Object.entries(rewardsData.earnedRewards).map(
                (earnedReward, earnedRewardIndex) => (
                  <div
                    key={`kst-dashboard-earned-rewards-${earnedRewardIndex}`}
                    className="kst-dashboard-rewards-sub-section-list-item earned-reward"
                  >
                    <div className="kst-dashboard-list-item-quantity">
                      {earnedReward[1].quantity}
                    </div>

                    <img src={earnedReward[1].badgeUrl} />

                    <div className="kst-dashboard-list-item-label">
                      {earnedReward[1].label}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
