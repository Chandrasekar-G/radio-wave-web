import { IStation } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPlayerState {
  currentStation: IStation | null;
}

const initialState: IPlayerState = {
  currentStation: null,
};

export const player = createSlice({
  name: "player",
  initialState,
  reducers: {
    reset: () => initialState,
    setStation: (state, action: PayloadAction<IStation>) => {
      state.currentStation = action.payload;
    },
  },
});

export const { setStation, reset } = player.actions;
export default player.reducer;
