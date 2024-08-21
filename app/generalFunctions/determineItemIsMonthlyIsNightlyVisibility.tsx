export const determineItemIsMonthlyIsNightlyVisibility = (
  isMonthly: boolean,
  isNightly: boolean,
  itemIsMonthly: boolean,
  itemIsNightly: boolean
) => {
  if (isMonthly && isNightly && (itemIsMonthly || itemIsNightly)) return "flex";

  if (isMonthly && !isNightly && itemIsMonthly) return "flex";

  if (!isMonthly && isNightly && itemIsNightly) return "flex";

  if (!isMonthly && !isNightly) return "none";

  return "none";
};
