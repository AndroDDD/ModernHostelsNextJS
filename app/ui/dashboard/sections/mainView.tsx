"use client";

import { useState } from "react";

import Sidebar from "./sidebar";
import InfoView from "./infoView";
import "@/app/ui/styles/scss/components/dashboard/sections/main-view.scss";

export default function MainView() {
  const [currentView, setCurrentView] = useState<string>("overview");

  return (
    <>
      <section id="kst-main-dashboard-view">
        <Sidebar setCurrentView={setCurrentView} />
        <InfoView currentView={currentView} />
      </section>
      <div className="kst-main-dashboard-footer-gradient"></div>
    </>
  );
}
