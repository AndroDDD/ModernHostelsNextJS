import {
  checkIfStackCountExceeded,
  StackCount,
  stackCountDefaultData,
} from "@/app/generalFunctions/checkIfStackCountExceeded";

export const findValidClassnameInParentElements = (
  eventElement: HTMLElement | null,
  enableConsoleLog: boolean = false,
  stackCountData: StackCount = stackCountDefaultData
): string => {
  if (eventElement === null) return "";

  const eventElementClassname = eventElement.classList[0];
  const isValidClassname = eventElementClassname ? true : false;

  const stackCountCheckData = checkIfStackCountExceeded(stackCountData);

  return isValidClassname
    ? eventElementClassname
    : stackCountCheckData.isExceeded
    ? ""
    : findValidClassnameInParentElements(
        eventElement,
        enableConsoleLog,
        stackCountCheckData.stackCountData
      );
};
