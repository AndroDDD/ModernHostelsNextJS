import Link from "next/link";
import "@/app/ui/styles/scss/components/checkout/thank-you/sections/thank-you-section.scss";

export default async function ThankYouSection() {
  return (
    <section id="kst-thank-you-page-section">
      <div className="kst-thank-you-message">
        Check Your Email For Order Confirmation Details!
      </div>
      <Link className="kst-thank-you-back-to-home-link" href="/">
        Return Back Home
      </Link>
    </section>
  );
}
