import HeaderSection from "@/app/ui/checkout/thankYou/sections/headerSection";
import ThankYouSection from "@/app/ui/checkout/thankYou/sections/thankYouSection";
import "@/app/ui/styles/scss/route-pages/checkout/thank-you/thank-you.scss";

export default async function Page() {
  return (
    <main id="kst-thank-you-page">
      <HeaderSection />
      <ThankYouSection />
    </main>
  );
}
