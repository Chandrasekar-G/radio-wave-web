"use client";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { setStation } from "@/store/features/playerSlice";
import { IStation } from "@/types";

function RadioStationCard() {
  const dispatch = useAppDispatch();

  const setStationVal = () => {
    const station: IStation = {
      changeuuid: "5acfb0db-a993-405c-8726-59e253fe8117",
      stationuuid: "9d69cc77-b698-40c0-8036-17cd1f09ca44",
      name: "\tFun Radio",
      url: "http://stream.funradio.sk:8000/fun128.mp3",
      url_resolved: "http://stream.funradio.sk:8000/fun128.mp3",
      homepage: "http://www.funradio.sk/",
      favicon:
        "http://www.funradio.sk/img/logo/apple-icon-120x120.png?v=2023-08-14-1530",
      tags: "",
      country: "Slovakia",
      countrycode: "SK",
      state: "",
      language: "",
      languagecodes: "",
      votes: 126,
      codec: "MP3",
      bitrate: 128,
      hls: 0,
      lastcheckok: 1,
      clickcount: 50,
      ssl_error: 0,
      has_extended_info: false,
      serveruuid: "",
      clicktrend: "",
      geo_lat: 0,
      geo_long: 0,
      iso_3166_2: "",
      tags_arr: [],
      clicktimestamp_iso8601: new Date(),
      lastchangetime_iso8601: new Date(),
      lastcheckoktime_iso8601: new Date(),
      lastchecktime_iso8601: new Date(),
      lastlocalchecktime_iso8601: new Date(),
    };
    dispatch(setStation(station));
  };

  return (
    <div>
      RadioStationCard
      <button onClick={setStationVal}>Play</button>
    </div>
  );
}

export default RadioStationCard;
