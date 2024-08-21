import HeaderSection from "@/app/ui/checkout/payment/sections/headerSection";
import PaymentDetails from "@/app/ui/checkout/payment/sections/paymentDetails";

import "@/app/ui/styles/scss/route-pages/checkout/payment/payment.scss";

export default function Page() {
  return (
    <main id="kst-payment-page">
      <HeaderSection />
      <PaymentDetails />
    </main>
  );
}
