"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";

function Player() {
  const currentStation = useAppSelector(
    (state) => state.playerReducer.currentStation
  );

  return (
    <div>
      Player
      <pre>{JSON.stringify(currentStation)}</pre>
    </div>
  );
}

export default Player;
