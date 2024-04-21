"use client";

import RadioStationList from "@/components/RadioStationList";
import { useGetNearbyStationsQuery } from "@/store/services/stationService";

function HomePage() {
  const { isLoading, isFetching, data, error } =
    useGetNearbyStationsQuery(null);

  return (
    <div>
      HomePage
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <RadioStationList stations={data}></RadioStationList>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;
