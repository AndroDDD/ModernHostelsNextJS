export const calculateSortValue = (
  aValue: number,
  bValue: number,
  low2High: boolean = true
) => {
  const conditionalLeadStatement = low2High ? aValue > bValue : aValue < bValue;

  return conditionalLeadStatement ? 1 : aValue === bValue ? 0 : -1;
};
