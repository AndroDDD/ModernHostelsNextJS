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
        <div
          className={`kst-dashboard-compact-container-item`}
        >{`Order Id: ${order_id}`}</div>
        <div
          className={`kst-dashboard-compact-container-item`}
        >{`Order Date: ${order_date}`}</div>
      </div>

      <div className={`kst-dashboard-compact-container`}>
        <div
          className={`kst-dashboard-compact-container-item`}
        >{`Start Date: ${start_date}`}</div>
        <div
          className={`kst-dashboard-compact-container-item`}
        >{`End Date: ${end_date}`}</div>
      </div>
    </div>
  );
}
