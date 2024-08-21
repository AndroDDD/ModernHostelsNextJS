import "@/app/ui/styles/scss/components/shared-components/calendar/alert-block.scss";

type AlertBlockParameters = {
  calendarType?: string;
};

export default ({ calendarType }: AlertBlockParameters) => {
  return (
    <div
      className={`kst-check-in-out-calendar-alert-block ${
        calendarType ? (calendarType === "compact" ? "compact" : "") : ""
      }`}
    ></div>
  );
};
