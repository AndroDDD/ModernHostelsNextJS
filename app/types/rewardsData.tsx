export type RewardsData = {
  earnedRewards: {
    [key: string]: {
      quantity: number;
      badgeUrl: string;
      label: string;
    };
  };
  rewardsProgresses: {
    badges: {
      label: string;
      badgeUrl: string;
    }[];
    bookedDaysTilReward: number;
  }[];
};

export type RewardProgressData = {
  badges: {
    label: string;
    badgeUrl: string;
  }[];
  bookedDaysTilReward: number;
};
