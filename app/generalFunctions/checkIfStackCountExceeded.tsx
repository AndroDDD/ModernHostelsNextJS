export const stackCountDefaultData = {
  maxStack: 250,
  currentStack: 0,
  timer: {
    startEpochTime: new Date().getTime(),
    timeElapsed: 0,
  },
};

export type StackCount = {
  maxStack: number;
  currentStack: number;
  timer: {
    startEpochTime: number;
    timeElapsed: number;
  };
};

export const checkIfStackCountExceeded = (
  stackCountData: StackCount,
  enableConsoleLog: boolean = false
): { isExceeded: boolean; stackCountData: StackCount } => {
  if (enableConsoleLog) console.log({ stackCountData });

  let updatedStackCountData = {
    ...stackCountData,
    currentStack: stackCountData.currentStack + 1,
    timer: {
      ...stackCountData.timer,
      timeElapsed: new Date().getTime() - stackCountData.timer.startEpochTime,
    },
  };

  return {
    isExceeded: stackCountData.currentStack > stackCountData.maxStack,
    stackCountData: updatedStackCountData,
  };
};
