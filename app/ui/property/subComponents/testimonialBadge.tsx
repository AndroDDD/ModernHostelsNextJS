import { TestimonialBadgeParameters } from "@/app/types/testimonialBadgeParameters";
import "@/app/ui/styles/scss/components/property/sub-components/testimonial-badge.scss";

export default ({ from, date, review }: TestimonialBadgeParameters) => {
  return (
    <div className="kst-testimonial-badge">
      <div className="kst-testimonial-badge-from">{from}</div>

      <div className="kst-testimonial-badge-date">{date}</div>

      <div className="kst-testimonial-badge-review">{review}</div>
    </div>
  );
};
