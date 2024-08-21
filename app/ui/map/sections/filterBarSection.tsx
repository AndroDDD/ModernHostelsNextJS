"use client";
import { useState, useEffect } from "react";

import { FilterBarData } from "@/app/types/mapPageData";
import { formatDateDisplay } from "@/app/generalFunctions/formatDate";
import { checkIfContainsUppercase } from "@/app/generalFunctions/checkIfContainsUppercase";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import { findValidClassnameInParentElements } from "@/app/generalFunctions/findValidClassnameInParentElements";
import CompactCheckInOutCalendar from "@/app/ui/sharedComponents/calendar/compactCheckInOutCalendar";
import MoreFiltersListOneItem from "../subComponents/moreFiltersListOneItem";
import "@/app/ui/styles/scss/components/map/sections/filter-bar-section.scss";
import { BookNowFormSendData } from "@/app/types/bookNowFormData";

type FilterBarParameters = {
  setFilterBarData: React.Dispatch<
    React.SetStateAction<BookNowFormSendData | FilterBarData>
  >;
};

export default ({
  markets,
  dates,
  maxPrice,
  beds,
  bathrooms,
  workstations,
  amenities,
  setFilterBarData,
}: FilterBarData & FilterBarParameters) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterBarData>({
    markets: markets,
    dates: dates,
    maxPrice: maxPrice,
    beds: beds,
    bathrooms: bathrooms,
    workstations: workstations,
    amenities: amenities,
  });

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const restrictedClassnames = [
        "kst-check-in-out-calendar",
        "kst-map-page-filter-bar-section-choose-dates",
        "kst-map-page-filter-bar-section-choose-market",
        "kst-map-page-filter-bar-section-choose-price",
        "kst-map-page-filter-bar-section-more-filters",
      ];
      const eventElement = event.target as HTMLElement;

      let eventClassname = eventElement.classList[0];

      eventClassname =
        typeof eventClassname === "string"
          ? eventClassname
          : findValidClassnameInParentElements(eventElement.parentElement);

      const isClassnameRestricted = restrictedClassnames.find(
        (classname) => classname === eventClassname.slice(0, classname.length)
      )
        ? true
        : false;

      if (!isClassnameRestricted) {
        closeFiltersDisplay();
      }
    });
  }, []);

  return (
    <section id="kst-map-page-filter-bar-section" className="open">
      <div className="kst-map-page-filter-bar-section-choose-market">
        <div
          className="kst-map-page-filter-bar-section-choose-market-menu-toggle"
          onClick={(event) => {
            event.preventDefault();

            const menuListElement = event.currentTarget.parentElement
              ?.lastChild as HTMLDivElement;

            toggleElementDisplay(menuListElement);
          }}
        >
          <div className="kst-map-page-filter-bar-section-choose-market-menu-toggle-text">
            {markets.selectedIndex > -1 &&
            markets.selectedIndex < markets.list.length
              ? markets.list[markets.selectedIndex]
              : "Select a Market"}
          </div>

          <div className="kst-map-page-filter-bar-section-choose-market-menu-toggle-icon">
            <i className="kst-map-page-filter-bar-section-choose-market-menu-list-icon fa-solid fa-chevron-down"></i>
          </div>
        </div>

        <div
          className="kst-map-page-filter-bar-section-choose-market-menu-list"
          style={{ display: "none" }}
        >
          {markets.list.map((marketName) => (
            <div
              className="kst-map-page-filter-bar-section-choose-market-menu-list-item"
              onClick={(event) => {
                event.preventDefault();

                const menuListElement = event.currentTarget
                  .parentElement as HTMLDivElement;

                toggleElementDisplay(menuListElement);

                setFilterBarData((prevFilterBarData) => {
                  if (prevFilterBarData && "markets" in prevFilterBarData) {
                    const updatedFilterBarData: FilterBarData = {
                      ...prevFilterBarData,
                      markets: {
                        ...prevFilterBarData.markets,
                        selectedIndex: prevFilterBarData.markets.list.findIndex(
                          (marketNameToCheck) =>
                            marketNameToCheck === marketName
                        ),
                      },
                    };

                    return updatedFilterBarData;
                  }
                  return prevFilterBarData;
                });
              }}
            >
              {marketName}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="kst-map-page-filter-bar-section-choose-dates">
        <div
          className="kst-map-page-filter-bar-section-choose-dates-start"
          onClick={(event) => {
            event.preventDefault();

            toggleElementDisplay(
              event.currentTarget.parentElement?.lastChild as HTMLDivElement
            );
          }}
        >
          <div className="kst-map-page-filter-bar-section-choose-dates-start-calendar-toggle">
            {dates.start === ""
              ? "Choose date"
              : formatDateDisplay(dates.start)}
          </div>
        </div>

        <div className="kst-map-page-filter-bar-section-choose-dates-start-calendar-arrow">
          {fetchSVGIcon("rightArrow")}
        </div>

        <div
          className="kst-map-page-filter-bar-section-choose-dates-end"
          onClick={(event) => {
            event.preventDefault();

            toggleElementDisplay(
              event.currentTarget.parentElement?.lastChild as HTMLDivElement
            );
          }}
        >
          <div className="kst-map-page-filter-bar-section-choose-dates-end-calendar-toggle">
            {dates.end === "" ? "Choose date" : formatDateDisplay(dates.end)}
          </div>
        </div>

        <div
          className="kst-map-page-filter-bar-section-choose-dates-calendar"
          style={{ display: "none" }}
        >
          <CompactCheckInOutCalendar setFiltersData={setFilterBarData} />
        </div>
      </div> */}

      <div className="kst-map-page-filter-bar-section-choose-price">
        <div
          className="kst-map-page-filter-bar-section-choose-price-toggle"
          onClick={(event) => {
            event.preventDefault();

            const priceInputElement = event.currentTarget
              .nextSibling as HTMLDivElement;

            toggleElementDisplay(priceInputElement);
          }}
        >
          {maxPrice === 0 ? "Price" : `$${maxPrice}`}
        </div>

        <div
          className="kst-map-page-filter-bar-section-choose-price-input"
          style={{ display: "none" }}
        >
          <div className="kst-map-page-filter-bar-section-choose-price-input-label">
            {"Max Daily Booking Price"}
          </div>

          <div className="kst-map-page-filter-bar-section-choose-price-input-container">
            <span className="kst-map-page-filter-bar-section-choose-price-input-container-dollar-sign">
              {"$"}
            </span>

            <input
              type="number"
              className="kst-map-page-filter-bar-section-choose-price-input-container-number"
              defaultValue={maxPrice}
              onChange={(event) => {
                const inputValue = +event.currentTarget.value;

                if (inputValue < 0) {
                  event.currentTarget.value = "0";
                }
              }}
            ></input>
          </div>

          <div className="kst-map-page-filter-bar-section-choose-price-input-actions">
            <div
              className="kst-map-page-filter-bar-section-choose-price-input-actions-clear"
              onClick={(event) => {
                event.preventDefault();

                const eventInputElementTraverse = event.currentTarget
                  .parentElement?.parentElement?.children[1]
                  .lastChild as HTMLInputElement;

                eventInputElementTraverse.value = "0";

                setFilterBarData((prevFilterBarData) => ({
                  ...prevFilterBarData,
                  maxPrice: 0,
                }));
              }}
            >
              {"Clear"}
            </div>

            <div
              className="kst-map-page-filter-bar-section-choose-price-input-actions-apply"
              onClick={(event) => {
                event.preventDefault();

                const choosePriceInputContainer =
                  event.currentTarget.parentElement?.parentElement;
                const eventInputElementTraverse = choosePriceInputContainer
                  ?.children[1].lastChild as HTMLInputElement;

                setFilterBarData((prevFilterBarData) => {
                  const updatedMaxPrice =
                    +eventInputElementTraverse.value > 0
                      ? +eventInputElementTraverse.value
                      : 0;

                  const updatedFilterBarData:
                    | FilterBarData
                    | BookNowFormSendData = {
                    ...prevFilterBarData,
                    maxPrice: updatedMaxPrice,
                  };

                  return updatedFilterBarData;
                });

                if (choosePriceInputContainer) {
                  choosePriceInputContainer.style.display = "none";
                }
              }}
            >
              {"Apply"}
            </div>
          </div>
        </div>
      </div>

      <div className="kst-map-page-filter-bar-section-more-filters">
        <div
          className="kst-map-page-filter-bar-section-more-filters-toggle"
          onClick={(event) => {
            event.preventDefault();

            const moreFiltersInpusElement = event.currentTarget
              .nextSibling as HTMLDivElement;

            toggleElementDisplay(moreFiltersInpusElement);
          }}
        >
          {"More Filters"}
        </div>

        <div
          className="kst-map-page-filter-bar-section-more-filters-inputs"
          style={{ display: "none" }}
        >
          <div className="kst-map-page-filter-bar-section-more-filters-inputs-lists">
            <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-1">
              {selectedFilters && selectedFilters.beds ? (
                <MoreFiltersListOneItem
                  itemName="Beds"
                  itemValue={selectedFilters.beds}
                  setFilterBarData={setSelectedFilters}
                />
              ) : (
                <></>
              )}
              {selectedFilters && selectedFilters.bathrooms ? (
                <MoreFiltersListOneItem
                  itemName="Bathrooms"
                  itemValue={selectedFilters.bathrooms}
                  setFilterBarData={setSelectedFilters}
                />
              ) : (
                <></>
              )}
              {selectedFilters && selectedFilters.workstations ? (
                <MoreFiltersListOneItem
                  itemName="Workstations"
                  itemValue={selectedFilters.workstations}
                  setFilterBarData={setSelectedFilters}
                />
              ) : (
                <></>
              )}
            </div>

            <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-2">
              <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-header">
                {"Amenities"}
              </div>

              <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-items">
                {selectedFilters && selectedFilters.amenities ? (
                  Object.entries(selectedFilters.amenities).map((amenity) => (
                    <div className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-item">
                      <div
                        className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-item-toggle"
                        onClick={(event) => {
                          event.preventDefault();

                          console.log("clicking");

                          const updatedValue =
                            (event.currentTarget.firstChild as HTMLDivElement)
                              .style.display === "none"
                              ? true
                              : false;

                          setSelectedFilters((prevFilterBarData) => {
                            return {
                              ...prevFilterBarData,
                              amenities: {
                                ...prevFilterBarData.amenities,
                                [amenity[0]]: updatedValue,
                              },
                            };
                          });
                        }}
                      >
                        <div
                          className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-item-toggle-inner-circle"
                          style={{
                            display: amenity[1] === true ? "flex" : "none",
                          }}
                        >
                          {fetchSVGIcon("checkMarkWithGreenBackground")}
                        </div>
                      </div>

                      <label className="kst-map-page-filter-bar-section-more-filters-inputs-list-2-item-label">
                        {formatLabelText(amenity[0])}
                      </label>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="kst-map-page-filter-bar-section-more-filters-inputs-actions">
            <div
              className="kst-map-page-filter-bar-section-more-filters-inputs-actions-show-listings"
              onClick={(event) => {
                const moreFiltersContainer =
                  event.currentTarget.parentElement?.parentElement;

                setFilterBarData((prevFilterBarData) => {
                  return {
                    ...prevFilterBarData,
                    beds: selectedFilters.beds,
                    bathrooms: selectedFilters.bathrooms,
                    workstations: selectedFilters.workstations,
                    amenities: selectedFilters.amenities,
                  };
                });

                if (moreFiltersContainer) {
                  moreFiltersContainer.style.display = "none";
                }
              }}
            >
              {"Apply Filters"}
            </div>

            <div
              className="kst-map-page-filter-bar-section-more-filters-inputs-actions-clear-all"
              onClick={(event) => {
                event.preventDefault();

                setFilterBarData((prevFilterBarData) => {
                  return {
                    ...prevFilterBarData,
                    beds: {
                      value: 0,
                      useExact: false,
                    },
                    bathrooms: {
                      value: 0,
                      useExact: false,
                    },
                    workstations: {
                      value: 0,
                      useExact: false,
                    },
                    amenities: {
                      kitchen: false,
                      airConditioning: false,
                      allUtilitiesIncluded: false,
                      television: false,
                      washerAndDryer: false,
                      heating: false,
                      cable: false,
                      computerMonitor: false,
                    },
                  };
                });
              }}
            >
              {"Clear all"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const closeFiltersDisplay = () => {
  // const calendarElement = document.getElementsByClassName(
  //   "kst-map-page-filter-bar-section-choose-dates-calendar"
  // )[0] as HTMLDivElement;
  const chooseMarketElement = document.getElementsByClassName(
    "kst-map-page-filter-bar-section-choose-market-menu-list"
  )[0] as HTMLDivElement;
  const priceInputElement = document.getElementsByClassName(
    "kst-map-page-filter-bar-section-choose-price-input"
  )[0] as HTMLDivElement;
  const moreFiltersInputsElement = document.getElementsByClassName(
    "kst-map-page-filter-bar-section-more-filters-inputs"
  )[0] as HTMLDivElement;

  // calendarElement.style.display = "none";
  chooseMarketElement.style.display = "none";
  priceInputElement.style.display = "none";
  moreFiltersInputsElement.style.display = "none";
};

const toggleElementDisplay = (element: HTMLDivElement) => {
  const elementDisplayValue = element.style.display;

  closeFiltersDisplay();

  element.style.display = elementDisplayValue === "none" ? "flex" : "none";
};

const formatLabelText = (labelText: string) => {
  let formattedText = "";

  for (let i = 0; i < labelText.length; i++) {
    if (i === 0) {
      formattedText += labelText[i].toUpperCase();
    } else if (checkIfContainsUppercase(labelText[i])) {
      formattedText += ` ${labelText[i]}`;
    } else {
      formattedText += labelText[i];
    }
  }

  return formattedText;
};
