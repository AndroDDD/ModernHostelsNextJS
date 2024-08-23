"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PropertyData } from "@/app/types/propertyData";
import { FilterBarData, PropertiesSectionData } from "@/app/types/mapPageData";
import { findValidClassnameInParentElements } from "@/app/generalFunctions/findValidClassnameInParentElements";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import { formatNewDateParameter } from "@/app/generalFunctions/formatDate";
import { convertPriceStringToNumber } from "@/app/generalFunctions/convertPriceStringToNumber";
import { sortProperties } from "@/app/generalFunctions/sortProperties";
import PropertyBadge from "@/app/ui/map/subComponents/propertyBadge";
import "@/app/ui/styles/scss/components/map/sections/properties-section.scss";
import { BookNowFormSendData } from "@/app/types/bookNowFormData";
import GoogleMapSection from "../../sharedComponents/map/mapSection";
import filterBarSection from "./filterBarSection";

type PropertiesSectionParameters = {
  properties: PropertyData[];
  filterBarData: BookNowFormSendData | FilterBarData | undefined;
};

const PropertiesSection: React.FC<PropertiesSectionParameters> = ({
  properties,
  filterBarData,
}) => {
  const router = useRouter();
  const [sortedProperties, setSortedProperties] = useState<PropertyData[]>();
  const [{ isMonthly, isNightly, sortBy, prevSortBy }, setSectionData] =
    useState<PropertiesSectionData>({
      isNightly: true,
      isMonthly: true,
      sortBy: "Price",
      prevSortBy: "",
    });
  const [menuListKey, setMenuListKey] = useState<number>(0);
  const [selectedProperty, setSelectedProperty] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const restrictedClassnames = [
        "kst-map-page-properties-section-list-header-sort-menu",
      ];
      const eventElement = event.target as HTMLElement;

      let eventClassname = findValidClassnameInParentElements(eventElement);

      const isClassnameRestricted = restrictedClassnames.find(
        (classname) => classname === eventClassname.slice(0, classname.length)
      )
        ? true
        : false;

      if (!isClassnameRestricted) {
        const sortMenuElement = document.getElementsByClassName(
          "kst-map-page-properties-section-list-header-sort-menu-list"
        )[0] as HTMLDivElement;

        sortMenuElement.style.display = "none";
      }
    });
  }, []);

  // Handle sorting and filtering of properties when market location changes
  useEffect(() => {
    if (sortedProperties && filterBarData && "maxPrice" in filterBarData) {
      const { filteredProperties } = filterProperties(
        properties,
        filterBarData
      );
      console.log({ filteredProperties });
      const { fetchedSortedProperties } = sortProperties(
        sortBy,
        filteredProperties
      );
      const propertiesListElement = document.getElementsByClassName(
        "kst-map-page-properties-section-list-items"
      )[0] as HTMLDivElement;

      setSortedProperties(fetchedSortedProperties);
      setMenuListKey((prevMenuListKey) => prevMenuListKey + 1);

      if (propertiesListElement) propertiesListElement.scrollTop = 0;
    }
  }, [properties]);

  // Handle sorting and filtering of current market location properties
  useEffect(() => {
    if (!filterBarData || !("maxPrice" in filterBarData)) return;

    const { filteredProperties } = filterProperties(properties, filterBarData);
    const { fetchedSortedProperties } = sortProperties(
      sortBy,
      filteredProperties
    );
    const propertiesListElement = document.getElementsByClassName(
      "kst-map-page-properties-section-list-items"
    )[0] as HTMLDivElement;

    setSortedProperties(fetchedSortedProperties);
    setSectionData((prevData) => {
      return {
        ...prevData,
        prevSortBy: sortBy,
      };
    });
    setMenuListKey((prevMenuListKey) => prevMenuListKey + 1);

    if (propertiesListElement) propertiesListElement.scrollTop = 0;
  }, [sortBy, filterBarData]);

  return (
    <section id="kst-map-page-properties-section">
      <div className="kst-map-page-properties-section-list open">
        <div className="kst-map-page-properties-section-list-header">
          <div className="kst-map-page-properties-section-list-header-option">
            <div
              className={`kst-map-page-properties-section-list-header-option-toggle ${
                isNightly ? "active" : ""
              }`}
              onClick={(event) => {
                event.preventDefault();

                setSectionData((prevData) => {
                  return {
                    ...prevData,
                    isNightly: !prevData.isNightly,
                  };
                });
              }}
            >
              {isNightly ? fetchSVGIcon("checkMarkWithGreenBackground") : <></>}
            </div>

            <label className="kst-map-page-properties-section-list-header-option-label">
              {"Nightly Rentals"}
            </label>
          </div>

          <div className="kst-map-page-properties-section-list-header-option">
            <div
              className={`kst-map-page-properties-section-list-header-option-toggle ${
                isMonthly ? "active" : ""
              }`}
              onClick={(event) => {
                event.preventDefault();

                setSectionData((prevData) => {
                  return {
                    ...prevData,
                    isMonthly: !prevData.isMonthly,
                  };
                });
              }}
            >
              {isMonthly ? fetchSVGIcon("checkMarkWithGreenBackground") : <></>}
            </div>

            <label className="kst-map-page-properties-section-list-header-option-label">
              {"Monthly Rentals"}
            </label>
          </div>

          <div className="kst-map-page-properties-section-list-header-sort-menu">
            <div
              className="kst-map-page-properties-section-list-header-sort-menu-toggle"
              onClick={(event) => {
                event.preventDefault();

                const sortMenuElement = event.currentTarget
                  .nextSibling as HTMLDivElement;

                sortMenuElement.style.display =
                  sortMenuElement.style.display === "none" ? "flex" : "none";
              }}
            >
              <div className="kst-map-page-properties-section-list-header-sort-menu-toggle-text">
                {`Sort by: ${sortBy}`}
              </div>

              <div className="kst-map-page-properties-section-list-header-sort-menu-toggle-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            <div
              key={menuListKey}
              className="kst-map-page-properties-section-list-header-sort-menu-list"
              style={{ display: "none" }}
            >
              {["Bedrooms", "Price", "Ratings"].map((optionName, index) => (
                <div
                  key={`kst-map-page-properties-section-list-header-menu-item-${index}`}
                  className="kst-map-page-properties-section-list-header-sort-menu-list-item"
                  onClick={(event) => {
                    event.preventDefault();

                    setSectionData((prevData) => {
                      return {
                        ...prevData,
                        sortBy: optionName,
                      };
                    });

                    const sortMenuElement = event.currentTarget
                      .parentElement as HTMLDivElement;
                    sortMenuElement.style.display = "none";
                  }}
                >
                  {optionName}
                </div>
              ))}
            </div>
          </div>
        </div>

        {sortedProperties ? (
          <div className="kst-map-page-properties-section-list-items">
            {sortedProperties.map((property, index) => (
              <PropertyBadge
                key={`kst-map-page-properties-section-list-item-${index}`}
                property={property}
                settings={{ isMonthly, isNightly }}
                badgeOnClick={(
                  e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  setSelectedProperty(index);
                }}
                viewPropertyOnClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  router.push(`/property/${property.pageSlug}`);
                }}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      {sortedProperties ? (
        <div className="kst-map-page-properties-section-map">
          <GoogleMapSection
            center={sortedProperties[selectedProperty]?.latLong ?? {}}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="kst-map-page-properties-section-toggle-map-and-list-container">
        <div
          className="kst-map-page-properties-section-toggle-map-and-list"
          onClick={(event) => {
            const reactEntryElement =
              document.getElementById("main-react-entry");
            const filterBarElement = document.getElementById(
              "kst-map-page-filter-bar-section"
            );
            const propertiesElement =
              event.currentTarget.parentElement?.parentElement?.children[0];
            const mapElement =
              event.currentTarget.parentElement?.parentElement?.children[1];
            const isPropertiesElementOpen =
              propertiesElement?.classList.contains("open");
            const isMapElementOpen = mapElement?.classList.contains("open");

            if (isPropertiesElementOpen) {
              propertiesElement?.classList.remove("open");
              filterBarElement?.classList.remove("open");
              mapElement?.classList.add("open");
              event.currentTarget.innerText = "View List";
              reactEntryElement?.scroll({
                top: -reactEntryElement.scrollTop,
                behavior: "smooth",
              });
            } else if (isMapElementOpen) {
              propertiesElement?.classList.add("open");
              filterBarElement?.classList.add("open");
              mapElement?.classList.remove("open");
              event.currentTarget.innerText = "View Map";
              reactEntryElement?.scroll({
                top: -reactEntryElement.scrollTop,
                behavior: "smooth",
              });
            }
          }}
        >
          {"View Map"}
        </div>
      </div>
    </section>
  );
};

const filterProperties = (
  properties: PropertyData[],
  filterBarData: FilterBarData | undefined
) => {
  if (filterBarData) {
    let filteredProperties = properties.filter((property) => {
      const isPropertyFiltered = checkIsPropertyFiltered(
        property,
        filterBarData
      );

      return isPropertyFiltered;
    });

    return { filteredProperties };
  }
  return { filteredProperties: properties };
};

const checkIsPropertyFiltered = (
  property: PropertyData,
  filterBarData: FilterBarData
) => {
  const filteredStartDate = new Date(
    `${filterBarData.dates.start}T00:00:00`
  ).getTime();
  const filteredEndDate = new Date(
    `${filterBarData.dates.end}T24:00:00`
  ).getTime();
  const filteredMaxPrice = filterBarData.maxPrice;
  const filteredNumberOfBeds = filterBarData.beds.value;
  const filteredUseExactNumberOfBeds = filterBarData.beds.useExact;
  const filteredNumberOfBathrooms = filterBarData.bathrooms.value;
  const filteredUseExactNumberOfBathrooms = filterBarData.bathrooms.useExact;
  const filteredNumberOfWorkstations = filterBarData.workstations.value;
  const filteredUseExactNumberOfWorkstations =
    filterBarData.workstations.useExact;
  const filteredHasKitchen = filterBarData.amenities.kitchen;
  const filteredHasAirConditioning = filterBarData.amenities.airConditioning;
  const filteredHasTelevision = filterBarData.amenities.television;
  const filteredHasWasherAndDryer = filterBarData.amenities.washerAndDryer;
  const filteredHasHeating = filterBarData.amenities.heating;
  const filteredHasCable = filterBarData.amenities.cable;
  const filteredHasComputerMonitor = filterBarData.amenities.computerMonitor;
  const filteredAllUtilitiesIncluded =
    filterBarData.amenities.allUtilitiesIncluded;
  const propertyAvailableDate = new Date(
    `${formatNewDateParameter(property.available)}T00:00:00`
  ).getTime();

  const isPropertyInFilteredDateRange =
    !Number.isNaN(filteredStartDate) && !Number.isNaN(filteredEndDate)
      ? propertyAvailableDate >= filteredStartDate &&
        propertyAvailableDate <= filteredEndDate
      : true;
  const isPropertyPriceLessThanFilteredMaxPrice =
    filteredMaxPrice > 0
      ? convertPriceStringToNumber(property.price) <= filteredMaxPrice
      : true;
  const isPropertyWithinFilteredNumberOfBeds =
    checkIfNumberOfSpacesMatchFilteredNumber(
      property.numberOfBeds,
      filteredNumberOfBeds,
      filteredUseExactNumberOfBeds
    );
  const isPropertyWithinFilteredNumberOfBathrooms =
    checkIfNumberOfSpacesMatchFilteredNumber(
      property.numberOfBaths,
      filteredNumberOfBathrooms,
      filteredUseExactNumberOfBathrooms
    );
  const isPropertyWithinFilteredNumberOfWorkstations =
    checkIfNumberOfSpacesMatchFilteredNumber(
      property.numberOfOffices,
      filteredNumberOfWorkstations,
      filteredUseExactNumberOfWorkstations
    );
  const isKitchenIncludedInProperty = checkIfAmenityIsIncluded(
    property.amenities.kitchen,
    filteredHasKitchen,
    filteredAllUtilitiesIncluded
  );
  const isAirConditioningIncluded = checkIfAmenityIsIncluded(
    property.amenities.airConditioning,
    filteredHasAirConditioning,
    filteredAllUtilitiesIncluded
  );
  const isTelevisionIncluded = checkIfAmenityIsIncluded(
    property.amenities.television,
    filteredHasTelevision,
    filteredAllUtilitiesIncluded
  );
  const isWasherAndDryerIncluded = checkIfAmenityIsIncluded(
    property.amenities.washerAndDryer,
    filteredHasWasherAndDryer,
    filteredAllUtilitiesIncluded
  );
  const isHeatingIncluded = checkIfAmenityIsIncluded(
    property.amenities.heating,
    filteredHasHeating,
    filteredAllUtilitiesIncluded
  );
  const isCableIncluded = checkIfAmenityIsIncluded(
    property.amenities.cable,
    filteredHasCable,
    filteredAllUtilitiesIncluded
  );
  const isComputerMonitorIncluded = checkIfAmenityIsIncluded(
    property.amenities.computerMonitor,
    filteredHasComputerMonitor,
    filteredAllUtilitiesIncluded
  );

  return (
    isPropertyInFilteredDateRange &&
    isPropertyPriceLessThanFilteredMaxPrice &&
    isPropertyWithinFilteredNumberOfBeds &&
    isPropertyWithinFilteredNumberOfBathrooms &&
    isPropertyWithinFilteredNumberOfWorkstations &&
    isKitchenIncludedInProperty &&
    isAirConditioningIncluded &&
    isTelevisionIncluded &&
    isWasherAndDryerIncluded &&
    isHeatingIncluded &&
    isCableIncluded &&
    isComputerMonitorIncluded
  );
};

const checkIfNumberOfSpacesMatchFilteredNumber = (
  propertyNumber: number,
  filteredNumber: number,
  useExact: boolean
) => {
  return propertyNumber > 0
    ? useExact
      ? propertyNumber === filteredNumber
      : propertyNumber >= filteredNumber
    : !propertyNumber
    ? false
    : true;
};

const checkIfAmenityIsIncluded = (
  amenityBoolean: boolean,
  singleCheckBoolean: boolean,
  allUtilitiesCheckBoolean: boolean
) => {
  return allUtilitiesCheckBoolean
    ? amenityBoolean
    : singleCheckBoolean
    ? amenityBoolean
    : true;
};

export { PropertiesSection as default };
