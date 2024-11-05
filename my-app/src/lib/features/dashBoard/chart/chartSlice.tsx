import { typeChart } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface chart {
  isFetching: boolean;
  data: typeChart[];
  error: string | null;
}

const initialState: chart = {
  isFetching: false,
  data: [],
  error: null,
};

export const chartSlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    chartStart: (state) => {
      state.isFetching = true;
    },
    chartSuccess: (
      state,
      action: PayloadAction<{
        data: typeChart[];
      }>
    ) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.error = null;
    },
    chartfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { chartStart, chartSuccess, chartfaulse } = chartSlice.actions;

export default chartSlice.reducer;
