export type MapPageData = {
  filterBarSection: FilterBarData;

  propertiesSectionData: PropertiesSectionData;
};

export type FilterBarData = {
  markets: {
    selectedIndex: number;
    list: any[];
  };
  dates: {
    start: string;
    end: string;
  };
  maxPrice: number;
  beds: {
    value: number;
    useExact: boolean;
  };
  bathrooms: {
    value: number;
    useExact: boolean;
  };
  workstations: {
    value: number;
    useExact: boolean;
  };
  amenities: {
    kitchen: boolean;
    airConditioning: boolean;
    allUtilitiesIncluded: boolean;
    television: boolean;
    washerAndDryer: boolean;
    heating: boolean;
    cable: boolean;
    computerMonitor: boolean;
  };
  [key: string]: any;
};

export type PropertiesSectionData = {
  isNightly: boolean;
  isMonthly: boolean;
  sortBy: string;
  prevSortBy: string;
};
