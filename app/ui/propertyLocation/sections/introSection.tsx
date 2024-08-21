import Link from "next/link";

import { IntroSectionParameters } from "@/app/types/locationPageData";
import "@/app/ui/styles/scss/components/property-location/sections/intro-section.scss";

export default ({ title, imgUrl, button }: IntroSectionParameters) => {
  return (
    <section id="kst-property-location-intro-section">
      <div className="kst-property-location-intro-section-background-image">
        <img src={imgUrl} width="100%" height="auto" />

        <div className="kst-property-location-intro-section-background-image-support"></div>
      </div>

      <div className="kst-property-location-intro-section-title">{title}</div>

      <Link
        href={button.href}
        className="kst-property-location-intro-section-button"
      >
        {button.text}
      </Link>
    </section>
  );
};
