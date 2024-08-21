import { CancellationPolicySection } from "@/app/types/propertyPageData";
import "@/app/ui/styles/scss/components/property/sections/cancellation-policy-section.scss";

export default ({
  headerTitle,
  cancellationPolicy,
  respondToEmail,
  securityDepositPolicy,
}: CancellationPolicySection) => {
  const lengthOfCancellationPolicy: number = cancellationPolicy.length;
  const lengthOfSecurityDepositPolicy: number = securityDepositPolicy.length;
  return (
    <div
      id="kst-property-page-cancellation-policy-section"
      style={
        lengthOfCancellationPolicy === 0 && lengthOfSecurityDepositPolicy === 0
          ? { display: "none" }
          : {}
      }
    >
      <div className="kst-property-page-cancellation-policy-section-divider"></div>

      <h4 className="kst-property-page-cancellation-policy-section-header">
        {headerTitle}
      </h4>

      {lengthOfCancellationPolicy > 0 ? (
        <>
          <p>{"Cancellation policy:"}</p>

          <p dangerouslySetInnerHTML={{ __html: cancellationPolicy }}></p>
        </>
      ) : (
        <></>
      )}

      {lengthOfSecurityDepositPolicy > 0 ? (
        <>
          <p>{"Security Deposit Policy:"}</p>

          <p dangerouslySetInnerHTML={{ __html: securityDepositPolicy }}></p>
        </>
      ) : (
        <></>
      )}

      <p>
        {"Please email "}
        <a href={`mailto:${respondToEmail}`}>{respondToEmail}</a>
        {` for any questions regarding ${
          lengthOfCancellationPolicy > 0
            ? `cancellations${
                lengthOfSecurityDepositPolicy > 0
                  ? " and security deposit."
                  : "."
              }`
            : lengthOfSecurityDepositPolicy > 0
            ? "security deposit."
            : "your stay."
        }`}
      </p>
    </div>
  );
};
