import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import { stationApi } from "./services/stationService";

export const store = configureStore({
  reducer: { playerReducer, [stationApi.reducerPath]: stationApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([stationApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
