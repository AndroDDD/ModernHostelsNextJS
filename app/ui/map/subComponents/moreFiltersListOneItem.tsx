"use client";

import { FilterBarData } from "@/app/types/mapPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import "@/app/ui/styles/scss/components/map/sub-components/more-filters-list-one-item.scss";

type MoreFiltersListOneItemParameters = {
  itemName: string;
  itemValue: {
    value: number;
    useExact: boolean;
  };
  setFilterBarData: React.Dispatch<React.SetStateAction<FilterBarData>>;
};

export default ({
  itemName,
  itemValue,
  setFilterBarData,
}: MoreFiltersListOneItemParameters) => {
  return (
    <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item">
      <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-header">
        {itemName}
      </div>

      <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-options">
        <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-increments">
          <span
            className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-increment"
            onClick={(event) => {
              event.preventDefault();

              let eventValue = (
                event.currentTarget.nextSibling as HTMLSpanElement
              ).innerText;
              eventValue =
                eventValue === "Any"
                  ? eventValue
                  : eventValue.slice(0, eventValue.length - 1);

              setFilterBarData((prevFilterBarData) => {
                const updatedValue =
                  +eventValue - 1 < 0 || eventValue === "Any"
                    ? 0
                    : +eventValue - 1;

                const updatedFilterBarData = {
                  ...prevFilterBarData,
                  [itemName.toLowerCase()]: {
                    ...prevFilterBarData[itemName.toLowerCase()],
                    value: updatedValue,
                  },
                };

                return updatedFilterBarData;
              });
            }}
          >
            {"-"}
          </span>

          <span
            className={`kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-value ${
              itemValue.value > 0 ? "selected" : ""
            }`}
          >
            {itemValue.value === 0 ? "Any" : `${itemValue.value}+`}
          </span>

          <span
            className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-item-increment"
            onClick={(event) => {
              event.preventDefault();

              let eventValue = (
                event.currentTarget.previousSibling as HTMLSpanElement
              ).innerText;
              eventValue =
                eventValue === "Any"
                  ? eventValue
                  : eventValue.slice(0, eventValue.length - 1);

              setFilterBarData((prevFilterBarData) => {
                const updatedValue = eventValue === "Any" ? 1 : +eventValue + 1;

                const updatedFilterBarData = {
                  ...prevFilterBarData,
                  [itemName.toLowerCase()]: {
                    ...prevFilterBarData[itemName.toLowerCase()],
                    value: updatedValue,
                  },
                };

                return updatedFilterBarData;
              });
            }}
          >
            {"+"}
          </span>
        </div>

        <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options">
          <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options-exact-match">
            <div
              className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options-exact-match-toggle"
              onClick={(event) => {
                event.preventDefault();

                setFilterBarData((prevFilterBarData) => {
                  const updatedValue =
                    !prevFilterBarData[itemName.toLowerCase()].useExact;

                  return {
                    ...prevFilterBarData,
                    [itemName.toLowerCase()]: {
                      ...prevFilterBarData[itemName.toLowerCase()],
                      useExact: updatedValue,
                    },
                  };
                });
              }}
            >
              <div
                className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options-exact-match-toggle-inner-circle"
                style={{ display: itemValue.useExact ? "flex" : "none" }}
              >
                {fetchSVGIcon("checkMarkWithGreenBackground")}
              </div>
            </div>

            <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options-exact-match-label">
              {"Use exact match"}
            </div>
          </div>

          <div
            className="kst-map-page-filter-bar-section-more-filters-inputs-list-1-more-options-clear"
            onClick={(event) => {
              event.preventDefault();

              setFilterBarData((prevFilterBarData) => {
                return {
                  ...prevFilterBarData,
                  [itemName.toLowerCase()]: {
                    value: 0,
                    useExact: false,
                  },
                };
              });
            }}
          >
            {"Clear"}
          </div>
        </div>
      </div>
    </div>
  );
};
