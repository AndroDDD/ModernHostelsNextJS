"use client";

import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Loader from "../loader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type GoogleMapSectionI = {
  center: {
    lat: number;
    lng: number;
  };
  destination?: {
    lat: number;
    lng: number;
  };
};

const GoogleMapSection = ({ center, destination }: GoogleMapSectionI) => {
  const [directions, setDirections] = React.useState(null);
  const [travelTime, setTravelTime] = React.useState(null);
  const [travelMode, setTravelMode] = React.useState<any>(null);

  const directionsCallback = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error("Directions request failed due to " + response.status);
      }
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const travelMode = window.google.maps.TravelMode.DRIVING;
      setTravelMode(travelMode); // This will log "DRIVING"
      console.log(travelMode); // This will log "DRIVING"
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      loadingElement={<Loader />}
    >
      {(center.lat || center.lat === 0) && (center.lng || center.lng === 0) ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
            {destination ? (
              <>
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: center,
                    travelMode: travelMode,
                  }}
                  callback={directionsCallback}
                />
                {directions && (
                  <DirectionsRenderer
                    options={{
                      directions: directions,
                    }}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </GoogleMap>
          {travelTime && <p>Estimated travel time: {travelTime}</p>}
        </>
      ) : (
        <div>
          Latitude and Longitude Coordinates are missing from Property Data.
          Reach out to support to resolve this issue.
        </div>
      )}
    </LoadScript>
  );
};

export default GoogleMapSection;
