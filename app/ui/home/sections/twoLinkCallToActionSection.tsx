"use client";

import Link from "next/link";

import "@/app/ui/styles/scss/components/home/sections/two-link-call-to-action-section.scss";

export default () => {
  return (
    <section id="kst-home-two-link-call-to-action-section">
      <div className="kst-home-two-link-call-to-action-section-title">
        {"Stay in the world's best homes"}
      </div>

      <div className="kst-home-two-link-call-to-action-section-links">
        <Link
          className="kst-home-two-link-call-to-action-section-links-1"
          href={`/map`}
        >
          {"Browse rental properties"}
        </Link>

        <Link
          className="kst-home-two-link-call-to-action-section-links-2"
          href={`/marketplace`}
        >
          {"I'm looking to buy"}
        </Link>
      </div>
    </section>
  );
};
