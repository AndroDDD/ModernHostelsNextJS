"use client";

import React from "react";

import "@/app/ui/styles/scss/components/dashboard/sections/sidebar.scss";

type SidebarInterface = {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sidebar({ setCurrentView }: SidebarInterface) {
  const handleClick = (view: string) => {
    setCurrentView(view);
  };
  const updateButtonStyles = (view: string) => {
    const sidebarEl = document.getElementsByClassName(
      "kst-dashboard-sidebar"
    )[0] as HTMLDivElement;

    for (let i = 0; i < sidebarEl.children.length; i++) {
      const button = sidebarEl.children[i] as HTMLDivElement;
      const buttonView = button.innerText.replace(/ /g, "-").toLowerCase();

      if (buttonView === view) {
        button.classList.add("viewing");
      } else {
        button.classList.remove("viewing");
      }
    }
  };

  return (
    <section className="kst-dashboard-sidebar">
      <div className="kst-dashboard-sidebar-header">Dashboard</div>
      <div
        className="kst-dashboard-sidebar-link viewing"
        onClick={(e) => {
          e.preventDefault();
          const buttonView = e.currentTarget.innerText
            .replace(/ /g, "-")
            .toLowerCase();

          handleClick(buttonView);
          updateButtonStyles(buttonView);
        }}
      >
        Overview
      </div>
      <div
        className="kst-dashboard-sidebar-link"
        onClick={(e) => {
          e.preventDefault();
          const buttonView = e.currentTarget.innerText
            .replace(/ /g, "-")
            .toLowerCase();

          handleClick(buttonView);
          updateButtonStyles(buttonView);
        }}
      >
        Bookings
      </div>
      <div
        className="kst-dashboard-sidebar-link"
        onClick={(e) => {
          e.preventDefault();
          const buttonView = e.currentTarget.innerText
            .replace(/ /g, "-")
            .toLowerCase();

          handleClick(buttonView);
          updateButtonStyles(buttonView);
        }}
      >
        Rewards
      </div>
      <div
        className="kst-dashboard-sidebar-link"
        onClick={(e) => {
          e.preventDefault();
          const buttonView = e.currentTarget.innerText
            .replace(/ /g, "-")
            .toLowerCase();

          handleClick(buttonView);
          updateButtonStyles(buttonView);
        }}
      >
        Messages
      </div>
      <div
        className="kst-dashboard-sidebar-link"
        onClick={(e) => {
          e.preventDefault();
          const buttonView = e.currentTarget.innerText
            .replace(/ /g, "-")
            .toLowerCase();

          handleClick(buttonView);
          updateButtonStyles(buttonView);
        }}
      >
        Settings
      </div>
    </section>
  );
}
