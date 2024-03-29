import { IStation } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stationApi = createApi({
  reducerPath: "stationApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nl1.api.radio-browser.info/json/",
  }),
  endpoints: (builder) => ({
    getNearbyStations: builder.query<IStation[], null>({
      query: () => ({
        url: "stations/search",
        method: "POST",
        body: {
          offset: 0,
          limit: 10,
          hidebroken: "true",
          order: "clickcount",
          reverse: "true",
        },
      }),
    }),
  }),
});

export const { useGetNearbyStationsQuery } = stationApi;
