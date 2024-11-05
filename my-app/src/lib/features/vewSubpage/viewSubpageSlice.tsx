import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
interface viewSubpage {
  isFetching: boolean;
  error: string | null;
}

const initialState: viewSubpage = {
  isFetching: false,
  error: null,
};

export const viewSubpageSlice = createSlice({
  name: "viewSubpage",
  initialState,
  reducers: {
    viewSubpageStart: (state) => {
      state.isFetching = true;
    },
    viewSubpageSuccess: (state, action) => {
      state.isFetching = false;
      state.error = null;
    },
    viewSubpagefaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { viewSubpageStart, viewSubpageSuccess, viewSubpagefaulse } =
  viewSubpageSlice.actions;

export default viewSubpageSlice.reducer;
