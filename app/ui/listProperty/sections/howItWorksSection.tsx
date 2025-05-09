import { HowItWorksSection } from "@/app/types/listPropertyPageData";
import "@/app/ui/styles/scss/components/list-property/sections/how-it-works-section.scss";

export default ({ title, subTitle, steps }: HowItWorksSection) => {
  const stepsFlattened = steps && Object.entries(steps);

  return (
    (title || subTitle || (stepsFlattened && stepsFlattened.length > 0)) && (
      <section id="kst-list-property-page-how-it-works-section">
        <div className="kst-list-property-page-how-it-works-section-header">
          {title}
        </div>

        <div className="kst-list-property-page-how-it-works-section-steps">
          {subTitle && (
            <div className="kst-list-property-page-how-it-works-section-sub-title">
              {subTitle}
            </div>
          )}

          {stepsFlattened &&
            stepsFlattened.map((stepSection, index) => (
              <div className="kst-list-property-page-how-it-works-section-step">
                <div className="kst-list-property-page-how-it-works-section-step-category">
                  {stepSection[0]}
                </div>

                <div
                  className="kst-list-property-page-how-it-works-section-step-numbered-section"
                  style={{
                    borderColor: `rgba(170, 212, 210, ${(index + 1) / 3})`,
                  }}
                >
                  {stepSection[1].map((step) => (
                    <div className="kst-list-property-page-how-it-works-section-step-numbered">
                      <span>{step.stepNumber}</span>

                      {step.subjectText}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    )
  );
};

export const isHowItWorksSectionRendered = ({
  title,
  subTitle,
  steps,
}: HowItWorksSection) => {
  const stepsFlattened = steps && Object.entries(steps);

  return title || subTitle || (stepsFlattened && stepsFlattened.length > 0);
};
