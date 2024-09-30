"use client";

import { useEffect, useState } from "react";

import { fetchCustomerOrders } from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/bookings.scss";
import OrderDetails from "../subComponents/orderDetails";
import PropertyBadge from "../../sharedComponents/propertyBadge";

type BookingsInterface = {
  customerId: string;
};

type OrderData = {
  user_id: string;
  order_id: string;
  order_date: string;
  start_date: string;
  end_date: string;
  full_name: string;
  reply_to: string;
  price_totals: any;
  property: any;
  ratings: {
    accuracy_rating?: {
      rating_date: string;
      rating: number;
    };
    location_rating?: {
      rating_date: string;
      rating: number;
    };
    cleanliness_rating?: {
      rating_date: string;
      rating: number;
    };
    support_rating?: {
      rating_date: string;
      rating: number;
    };
    check_in_rating?: {
      rating_date: string;
      rating: number;
    };
    value_rating?: {
      rating_date: string;
      rating: number;
    };
  };
};

export default function Bookings({ customerId }: BookingsInterface) {
  const [orders, setOrders] = useState<OrderData[]>();

  useEffect(() => {
    fetchCustomerOrders(customerId).then((data) => {
      console.log({ orders: data["orders"] });
      setOrders(data["orders"]);
    });
  }, []);

  return (
    <div id="kst-dashboard-bookings-section">
      {orders ? (
        orders.map((orderData) => (
          <div
            className="kst-dashboard-bookings-section-order"
            key={orderData.order_id}
          >
            <div className="kst-dashboard-bookings-section-order-details">
              <OrderDetails
                property_slug={orderData.property?.page_slug ?? ""}
                user_id={orderData.user_id}
                order_date={orderData.order_date}
                order_id={orderData.order_id}
                start_date={orderData.start_date}
                end_date={orderData.end_date}
                price_totals={orderData.price_totals}
                ratings={orderData.ratings}
              />
            </div>
            <div className="kst-dashboard-bookings-section-order-property-badge">
              <PropertyBadge
                property={{
                  propertyName: orderData.property?.name ?? "",
                  price:
                    `Booking Total: $${orderData.price_totals?.total_due}` ??
                    "",
                  rating: 0,
                  numberOfGuests:
                    orderData.property?.living_space_data
                      ?.number_of_guestrooms ?? 0,
                  numberOfBeds:
                    orderData.property?.living_space_data?.number_of_beds ?? 0,
                  numberOfBaths:
                    orderData.property?.living_space_data
                      ?.number_of_bathrooms ?? 0,
                  numberOfOffices:
                    orderData.property?.living_space_data
                      ?.number_of_workstations ?? 0,
                  images:
                    orderData.property?.image_galleries?.featured_images ?? "",
                  pageSlug: orderData.property?.page_slug ?? "",
                  location: orderData.property?.location_data?.street ?? "",
                  isMonthly:
                    orderData.property?.rental_length_data?.is_monthly ?? false,
                  isNightly:
                    orderData.property?.rental_length_data?.is_nightly ?? false,
                  latLong: orderData.property?.location_data?.lat_long,
                  available: orderData.order_date,
                  amenities: {},
                  dateLabel: "Booked:",
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="kst-dashboard-bookings-section-empty-orders">
          Start booking to see your stays here!
        </div>
      )}
    </div>
  );
}
