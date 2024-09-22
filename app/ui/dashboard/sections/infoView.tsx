"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import Overview from "../subSections/overview";
import Bookings from "../subSections/bookings";
import Rewards from "../subSections/rewards";
import Messages from "../subSections/messages";
import Settings from "../subSections/settings";

import "@/app/ui/styles/scss/components/dashboard/sections/info-view.scss";

type InfoViewInterface = {
  currentView: string;
};

export default function InfoView({ currentView }: InfoViewInterface) {
  const { user } = useUser();

  return (
    <section className="kst-dashboard-info-view">
      <section className="kst-dashboard-info-view-content">
        {setView(currentView, user?.sub ?? "")}
      </section>
    </section>
  );
}

const setView = (view: string, userId: string) => {
  switch (view) {
    case "overview": {
      return (
        <div className="kst-dashboard-info-inner-content">{<Overview />}</div>
      );
    }
    case "bookings": {
      return (
        <div className="kst-dashboard-info-inner-content">
          {<Bookings customerId={userId} />}
        </div>
      );
    }
    case "rewards": {
      return (
        <div className="kst-dashboard-info-inner-content">
          {<Rewards customerId={userId} />}
        </div>
      );
    }
    case "messages": {
      return (
        <div className="kst-dashboard-info-inner-content">{<Messages />}</div>
      );
    }
    case "settings": {
      return (
        <div className="kst-dashboard-info-inner-content">{<Settings />}</div>
      );
    }
    default: {
      return <div className="kst-dashboard-info-inner-content">{view}</div>;
    }
  }
};
