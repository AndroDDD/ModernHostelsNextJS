import { cookies } from "next/headers";
import { Metadata } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import { BookingDataForCookie } from "@/app/types/bookingDataForCookie";
import { sendEmail } from "@/app/generalFunctions/apiDataFetches/sendEmail";
import { updateWPCalendarData } from "@/app/generalFunctions/calendar/updateWPCalendarData";
import { updateWPOrdersData } from "@/app/generalFunctions/checkout/updateWPOrdersData";
import HeaderSection from "@/app/ui/checkout/thankYou/sections/headerSection";
import ThankYouSection from "@/app/ui/checkout/thankYou/sections/thankYouSection";
import "@/app/ui/styles/scss/route-pages/checkout/thank-you/thank-you.scss";

export const metadata: Metadata = {
  title: "Modern Hostel's Dashboard",
  description: "Dashboard for Modern Hostel's Guests",
  robots: "noindex",
};

export default async function Page() {
  const session = await getSession();

  const cookieStore = await cookies();
  const thankYouCookie = cookieStore.get("thankYouData");
  console.log({ thankYouCookie });

  if (!thankYouCookie) {
    redirect("/");
  }

  const thankYouData = JSON.parse(thankYouCookie.value);

  const bookingData = thankYouData.bookingData as BookingDataForCookie;
  const confirmationNumber = thankYouData.confirmationNumber;
  const user = session ? session.user : { sub: "guest-user" };

  const propertySlug = bookingData.propertyPageSlug;

  await updateWPCalendarData(
    propertySlug,
    bookingData.dates.checkIn,
    bookingData.dates.checkOut,
    bookingData.calendarSpaceId ?? null
  );

  const completedOrderData = {
    user_id: user?.sub ?? "guest-user",
    full_name: bookingData.contact?.name,
    reply_to: bookingData.contact?.email,
    property: bookingData.propertyName,
    property_page_slug: bookingData.propertyPageSlug,
    start_date: bookingData.dates.checkIn,
    end_date: bookingData.dates.checkOut,
    price_totals: {
      total_due: bookingData.priceTotals.totalDue,
      sub_total: bookingData.priceTotals.subTotal,
      taxes: bookingData.priceTotals.taxes,
      fees: {
        pet: bookingData.priceTotals.fees.pet,
        cleaning: bookingData.priceTotals.fees.cleaning,
        service: bookingData.priceTotals.fees.service,
      },
      taxes_fees_combined: bookingData.priceTotals.taxesFeesCombined,
      avg_night: bookingData.priceTotals.avgNight,
    },
    order_id: confirmationNumber,
  };

  await updateWPOrdersData(completedOrderData);

  const emailServer = 2;
  const emailSentSuccessfully = await sendEmail({
    data: completedOrderData,
    emailServer,
  });

  if (emailSentSuccessfully) {
    console.log("Email sent successfully!");
  } else {
    console.log("Failed to send email!");
  }

  return (
    <main id="kst-thank-you-page">
      <HeaderSection />
      <ThankYouSection />
    </main>
  );
}
