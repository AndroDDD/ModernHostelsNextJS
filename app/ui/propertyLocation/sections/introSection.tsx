import Link from "next/link";
import Image from "next/image";

import { IntroSectionParameters } from "@/app/types/locationPageData";
import "@/app/ui/styles/scss/components/property-location/sections/intro-section.scss";

export default ({ title, imgUrl, button }: IntroSectionParameters) => {
  return (
    <section id="kst-property-location-intro-section">
      <div className="kst-property-location-intro-section-background-image">
        <Image src={imgUrl} width={1250} height={1250} alt="" />

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
