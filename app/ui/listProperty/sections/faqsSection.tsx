"use client";

import { FAQsSection } from "@/app/types/listPropertyPageData";
import "@/app/ui/styles/scss/components/list-property/sections/faqs-section.scss";

export default ({ title, inquiries }: FAQsSection) => {
  return (
    <section className="kst-list-property-page-faqs-section">
      <div className="kst-list-property-page-faqs-section-header">{title}</div>

      <div className="kst-list-property-page-faqs-section-list">
        {inquiries.map((inquiry) => (
          <div
            className="kst-list-property-page-faqs-section-list-item"
            onClick={(event) => {
              event.preventDefault();

              const itemIsClosed =
                !event.currentTarget.classList.contains("is-open");

              let listElement = event.currentTarget.parentElement;
              let allItems =
                listElement?.children as unknown as HTMLDivElement[];

              for (let i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove("is-open");
              }

              if (itemIsClosed) {
                event.currentTarget.classList.add("is-open");
              }
            }}
          >
            <div className="kst-list-property-page-faqs-section-list-item-question-container">
              <div className="kst-list-property-page-faqs-section-list-item-question">
                {inquiry.question}
              </div>

              <div className="kst-list-property-page-faqs-section-list-item-toggle-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            <div className="kst-list-property-page-faqs-section-list-item-answer">
              {inquiry.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
