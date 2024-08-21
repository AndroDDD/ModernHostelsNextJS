import React from "react";

import {
  TableAndChairsIcon,
  CabinetsAndMirrorIcon,
  CouchIcon,
  AirConditionerIcon,
  SwivelChairIcon,
  CableBoxAndRemoteIcon,
  KitchenBlenderIcon,
  TableAndChairsIconv2,
  IronIcon,
  PoolIcon,
  BedIcon,
  TvAndRemoteIcon,
  WifiIcon,
  LeftArrowIcon,
  RightArrowIcon,
  CheckMarkWithGreenBackgroundIcon,
  DownArrowIcon,
  SimpleLeftArrowWithCircleBorder,
  SimpleRightArrowWithCircleBorder,
  XIcon,
} from "@/app/ui/sharedComponents/svgIcons";

const iconNames = {
  tableAndChairs: "tableAndChairs",
  cabinetsAndMirror: "cabinetsAndMirror",
  couchIcon: "couch",
  airConditioner: "airConditioner",
  swivelChair: "swivelChair",
  cableBoxAndRemote: "cableBoxAndRemote",
  kitchenBlender: "kitchenBlender",
  tableAndChairsv2: "tableAndChairsv2",
  iron: "iron",
  pool: "pool",
  bed: "bed",
  tvAndRemote: "tvAndRemote",
  wifi: "wifi",
  leftArrow: "leftArrow",
  rightArrow: "rightArrow",
  checkMarkWithGreenBackground: "checkMarkWithGreenBackground",
  downArrow: "downArrow",
  simpleLeftArrowWithCircleBorder: "simpleLeftArrowWithCircleBorder",
  simpleRightArrowWithCircleBorder: "simpleRightArrowWithCircleBorder",
  xIcon: "xIcon",
};

export const fetchSVGIcon = (iconName: string) => {
  switch (iconName) {
    case iconNames.tableAndChairs: {
      return TableAndChairsIcon;
    }

    case iconNames.cabinetsAndMirror: {
      return CabinetsAndMirrorIcon;
    }

    case iconNames.couchIcon: {
      return CouchIcon;
    }

    case iconNames.airConditioner: {
      return AirConditionerIcon;
    }

    case iconNames.swivelChair: {
      return SwivelChairIcon;
    }

    case iconNames.cableBoxAndRemote: {
      return CableBoxAndRemoteIcon;
    }

    case iconNames.kitchenBlender: {
      return KitchenBlenderIcon;
    }

    case iconNames.tableAndChairsv2: {
      return TableAndChairsIconv2;
    }

    case iconNames.iron: {
      return IronIcon;
    }

    case iconNames.pool: {
      return PoolIcon;
    }

    case iconNames.bed: {
      return BedIcon;
    }

    case iconNames.tvAndRemote: {
      return TvAndRemoteIcon;
    }

    case iconNames.wifi: {
      return WifiIcon;
    }

    case iconNames.leftArrow: {
      return LeftArrowIcon;
    }

    case iconNames.rightArrow: {
      return RightArrowIcon;
    }

    case iconNames.checkMarkWithGreenBackground: {
      return CheckMarkWithGreenBackgroundIcon;
    }

    case iconNames.downArrow: {
      return DownArrowIcon;
    }

    case iconNames.simpleLeftArrowWithCircleBorder: {
      return SimpleLeftArrowWithCircleBorder;
    }

    case iconNames.simpleRightArrowWithCircleBorder: {
      return SimpleRightArrowWithCircleBorder;
    }

    case iconNames.xIcon: {
      return XIcon;
    }

    default: {
      return <></>;
    }
  }
};
