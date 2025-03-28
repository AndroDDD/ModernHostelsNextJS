import { Metadata } from "next";

import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import Header from "@/app/ui/headerAndFooter/header/header";
import HeaderSection from "@/app/ui/checkout/orderReview/sections/headerSection";
import OrderReview from "@/app/ui/checkout/orderReview/sections/orderReview";
import FooterSeperatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/checkout/order-review/order-review.scss";

export const metadata: Metadata = {
  title: "Modern Hostel's Dashboard",
  description: "Dashboard for Modern Hostel's Guests",
  robots: "noindex",
};

export default async function Page() {
  const isMobile = await isMobileDevice();

  return (
    <main id="kst-order-review-page">
      <Header isMobile={isMobile} style="light-theme" />
      <HeaderSection />
      <OrderReview />
      <FooterSeperatorSection isMobile={isMobile} style="light-theme" />
      <Footer style="light-theme" />
    </main>
  );
}
