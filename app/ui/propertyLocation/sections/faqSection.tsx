"use client";

import { FAQSectionParameters } from "@/app/types/locationPageData";
import "@/app/ui/styles/scss/components/property-location/sections/faq-section.scss";

export default ({ title, questions }: FAQSectionParameters) => {
  return title && questions.length > 0 ? (
    <section className="kst-property-location-faq-section">
      <div className="kst-property-location-faq-section-header">{title}</div>
      <div className="kst-property-location-faq-section-list">
        {questions.map((question) => (
          <div
            className="kst-property-location-faq-section-list-item"
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
            <div className="kst-property-location-faq-section-list-item-question-container">
              <div className="kst-property-location-faq-section-list-item-question">
                {question.question}
              </div>

              <div className="kst-property-location-faq-section-list-item-toggle-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            <div className="kst-property-location-faq-section-list-item-answer">
              {question.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
};
