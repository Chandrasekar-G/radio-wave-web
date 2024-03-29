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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data?.map((station) => (
            <div
              key={station.changeuuid}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={station.favicon}
                alt={station.name}
                style={{ height: 180, width: 180 }}
              />
              <h3>{station.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
      <RadioStationList></RadioStationList>
    </div>
  );
}

export default HomePage;
