import { AlsoViewedSection } from "@/app/types/propertyPageData";
import PropertyBadge from "@/app/ui/property/subComponents/propertyBadge";
import "@/app/ui/styles/scss/components/property/sections/also-viewed-section.scss";

export default ({ title, properties }: AlsoViewedSection) => {
  return properties.length > 0 ? (
    <section id="kst-property-page-also-viewed-section">
      <div className="kst-property-page-also-viewed-section-header">
        {title}
      </div>

      <div className="kst-property-page-also-viewed-section-property-badges">
        {properties.map((property) => (
          <PropertyBadge {...property} />
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
};
