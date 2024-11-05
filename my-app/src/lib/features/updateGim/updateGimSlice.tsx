import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
interface updateGim {
  isFetching: boolean;
  data: string;
  error: string | null;
}

const initialState: updateGim = {
  isFetching: false,
  data: "",
  error: null,
};

export const updateGimSlice = createSlice({
  name: "updateGim",
  initialState,
  reducers: {
    updateGimStart: (state) => {
      state.isFetching = true;
    },
    updateGimSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = null;
    },
    updateGimfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { updateGimStart, updateGimSuccess, updateGimfaulse } =
  updateGimSlice.actions;

export default updateGimSlice.reducer;
