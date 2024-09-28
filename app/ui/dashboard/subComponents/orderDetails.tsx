"use client";

import "@/app/ui/styles/scss/components/dashboard/sub-components/order-details.scss";

type OrderDetailsInterface = {
  order_id: string;
  order_date: string;
  start_date: string;
  end_date: string;
  price_totals: any;
};

export default function OrderDetails({
  order_id,
  order_date,
  start_date,
  end_date,
  price_totals,
}: OrderDetailsInterface) {
  return (
    <div className={`kst-dashboard-booking-order-details-section`}>
      <div className={`kst-dashboard-compact-container`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span>Order Id:</span> {order_id}
        </div>

        <div className={`kst-dashboard-compact-container-item`}>
          <span>Order Date:</span> {order_date}
        </div>
      </div>

      <div className={`kst-dashboard-compact-container no-wrap`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span>Start Date:</span> {start_date}
        </div>

        <div className={`kst-dashboard-compact-container-item`}>
          <span>End Date:</span> {end_date}
        </div>
      </div>

      <div className={`kst-dashboard-compact-container`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span>Rating:</span>

          <div></div>
        </div>
      </div>
    </div>
  );
}
