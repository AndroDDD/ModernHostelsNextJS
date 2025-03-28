"use client";

import Link from "next/link";
import { useEffect } from "react";

import "@/app/ui/styles/scss/components/checkout/thank-you/sections/thank-you-section.scss";

export default function ThankYouSection() {
  useEffect(() => {
    document.cookie = `thankYouData=; path=/; domain=${window.location.hostname}; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  });

  return (
    <section id="kst-thank-you-page-section">
      <div className="kst-thank-you-message">
        Check Your Email For Order Confirmation Details!
      </div>
      <Link className="kst-thank-you-back-to-home-link" href="/">
        Return Back Home
      </Link>
    </section>
  );
}
