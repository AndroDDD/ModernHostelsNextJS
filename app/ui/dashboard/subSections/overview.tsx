"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { RewardProgressData, RewardsData } from "@/app/types/rewardsData";
import {
  fetchCustomerRewards,
  fetchCustomerOrders,
} from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import RewardBadge from "../subComponents/rewardBadge";
import PropertyBadge from "../../sharedComponents/propertyBadge";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/overview.scss";

export default function Overview() {
  const [rewardsData, setRewardsData] = useState<RewardsData>();
  const [ordersData, setOrdersData] = useState<any>([]);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      const userId = user?.sub ?? "";

      (async () => {
        const fetchedCustomerRewards = await fetchCustomerRewards(userId);
        console.log({ fetchedCustomerRewards });
        setRewardsData({
          earnedRewards: fetchedCustomerRewards.earnedRewards,
          rewardsProgresses:
            fetchedCustomerRewards.rewardsProgresses &&
            fetchedCustomerRewards.rewardsProgresses.length > 0
              ? fetchedCustomerRewards.rewardsProgresses.splice(0, 1)
              : [],
        });
        const fetchedCustomerOrders = await fetchCustomerOrders(userId);
        setOrdersData(
          fetchedCustomerOrders["orders"] &&
            fetchedCustomerOrders["orders"].length > 0
            ? fetchedCustomerOrders["orders"].splice(0, 3)
            : []
        );
      })();
    }
  }, [isLoading]);

  return (
    <section className="kst-dashboard-overview-section">
      <div className="kst-dashboard-overview-rewards">
        <div className="kst-dashboard-overview-rewards-header">
          Reward Progress
        </div>
        <div className="kst-dashboard-overview-rewards-list">
          {rewardsData && rewardsData.rewardsProgresses.length > 0 ? (
            rewardsData.rewardsProgresses.map(
              (rewardData: RewardProgressData, rewardIndex: number) => (
                <RewardBadge
                  rewardProgress={rewardData}
                  rewardProgressIndex={rewardIndex}
                />
              )
            )
          ) : (
            <div className="kst-dashboard-overview-rewards-list-empty">
              None Yet
            </div>
          )}
        </div>
      </div>

      <div className="kst-dashboard-overview-order">
        <div className="kst-dashboard-overview-order-header">
          Recent Bookings
        </div>
        <div className="kst-dashboard-overview-order-list">
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((orderData: any, orderIndex: number) => (
              <div
                key={`kst-dashboard-overview-order-list-item-${orderIndex}`}
                className="kst-dashboard-overview-order-list-item"
              >
                <PropertyBadge
                  abbreviateStats={true}
                  property={{
                    propertyName: orderData.property?.name ?? "",
                    price: orderData.price_totals?.total_due
                      ? `Booking Total: $${orderData.price_totals?.total_due}`
                      : "",
                    rating: 0,
                    numberOfGuests:
                      orderData.property?.living_space_data
                        ?.number_of_guestrooms ?? 0,
                    numberOfBeds:
                      orderData.property?.living_space_data?.number_of_beds ??
                      0,
                    numberOfBaths:
                      orderData.property?.living_space_data
                        ?.number_of_bathrooms ?? 0,
                    numberOfOffices:
                      orderData.property?.living_space_data
                        ?.number_of_workstations ?? 0,
                    images:
                      orderData.property?.image_galleries?.featured_images ??
                      "",
                    pageSlug: orderData.property?.page_slug ?? "",
                    location: orderData.property?.location_data?.street ?? "",
                    isMonthly:
                      orderData.property?.rental_length_data?.is_monthly ??
                      false,
                    isNightly:
                      orderData.property?.rental_length_data?.is_nightly ??
                      false,
                    latLong: orderData.property?.location_data?.lat_long,
                    available: orderData.start_date,
                    amenities: {},
                    dateLabel: "Booked:",
                  }}
                />
              </div>
            ))
          ) : (
            <div className={"kst-dashboard-overview-order-list-empty"}>
              Start booking to see your stays here!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
