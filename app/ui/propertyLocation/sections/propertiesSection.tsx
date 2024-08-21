"use client";

import Link from "next/link";

import { PropertiesSectionParameters } from "@/app/types/locationPageData";
import PropertyBadge from "@/app/ui/sharedComponents/propertyBadge";
import "@/app/ui/styles/scss/components/property-location/sections/properties-section.scss";

export default ({ properties, button }: PropertiesSectionParameters) => {
  return properties && properties.length > 0 ? (
    <section className="kst-property-location-properties-section">
      <div className="kst-property-location-properties-section-list">
        {properties.map((property) => (
          <div className="kst-property-location-properties-section-list-item">
            <PropertyBadge property={property} />
          </div>
        ))}
      </div>

      <Link
        href={button.href}
        className="kst-property-location-properties-section-button"
      >
        {button.text}
      </Link>
    </section>
  ) : (
    <></>
  );
};
