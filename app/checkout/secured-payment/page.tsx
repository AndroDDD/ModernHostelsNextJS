import { Metadata } from "next";

import HeaderSection from "@/app/ui/checkout/payment/sections/headerSection";
import PaymentDetails from "@/app/ui/checkout/payment/sections/paymentDetails";

import "@/app/ui/styles/scss/route-pages/checkout/payment/payment.scss";

export const metadata: Metadata = {
  title: "Modern Hostel's Dashboard",
  description: "Dashboard for Modern Hostel's Guests",
  robots: "noindex",
};

export default async function Page() {
  return (
    <main id="kst-payment-page">
      <HeaderSection />
      <PaymentDetails />
    </main>
  );
}
