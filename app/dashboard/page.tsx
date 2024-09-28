import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import Header from "@/app/ui/headerAndFooter/header/header";
import MainView from "../ui/dashboard/sections/mainView";
import FooterSeperatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/dashboard/page.scss";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect(`/`);
  }

  const isMobile = await isMobileDevice();

  return (
    <main id="kst-dashboard">
      <Header isMobile={isMobile} />
      <MainView />
      <FooterSeperatorSection isMobile={isMobile} />
      <Footer />
    </main>
  );
}
