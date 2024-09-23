"use client";

import { useState, useEffect } from "react";

import { RewardsData } from "@/app/types/rewardsData";
import { fetchCustomerRewards } from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import RewardBadge from "../subComponents/rewardBadge";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/rewards.scss";

type RewardsInterface = {
  customerId: string;
};

type RewardsComponentData = {
  rewardsProgresses: {
    badges: {
      label: string;
      badgeUrl: string;
    }[];
    bookedDaysTilReward: number;
  }[];
  earnedRewards: [
    string,
    {
      quantity: number;
      badgeUrl: string;
      label: string;
    }
  ][];
};

export default function Rewards({ customerId }: RewardsInterface) {
  const [rewardsData, setRewardsData] = useState<RewardsComponentData>();

  useEffect(() => {
    fetchCustomerRewards(customerId).then((rewardsData) => {
      console.log({ rewardsData });

      const earnedRewards = Object.entries(rewardsData.earnedRewards);

      setRewardsData({
        rewardsProgresses: rewardsData.rewardsProgresses,
        earnedRewards: earnedRewards,
      });
    });
  }, []);

  return (
    <div id="kst-dashboard-rewards-section">
      {rewardsData ? (
        <>
          <div className="kst-dashboard-rewards-sub-section">
            <h1>REWARD PROGRESSES</h1>

            <div className="kst-dashboard-rewards-sub-section-list">
              {rewardsData.rewardsProgresses &&
              rewardsData.rewardsProgresses.length > 0 ? (
                rewardsData.rewardsProgresses.map(
                  (rewardProgress, rewardProgressIndex) => (
                    <RewardBadge
                      rewardProgress={rewardProgress}
                      rewardProgressIndex={rewardProgressIndex}
                    />
                  )
                )
              ) : (
                <div className="kst-dashboard-empty-rewards">
                  Start booking with us to earn rewards!
                </div>
              )}
            </div>
          </div>

          <div className="kst-dashboard-rewards-sub-section">
            <h1>EARNED REWARDS</h1>

            <div className="kst-dashboard-rewards-sub-section-list">
              {rewardsData.earnedRewards &&
              rewardsData.earnedRewards.length > 0 ? (
                rewardsData.earnedRewards.map(
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
                )
              ) : (
                <div className="kst-dashboard-empty-rewards">None Yet</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="kst-dashboard-empty-rewards">
          Book a stay to start earning rewards!
        </div>
      )}
    </div>
  );
}
