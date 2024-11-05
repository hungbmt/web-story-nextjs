import { typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface parameterState {
  isfetching: boolean;
  data: {
    totalStory: number;
    totalViewPage: number;
    totalUser: number;
    totalError: number;
  };
  error: string | null;
}

const initialState: parameterState = {
  isfetching: false,
  data: {
    totalStory: 0,
    totalViewPage: 0,
    totalUser: 0,
    totalError: 0,
  },
  error: null,
};

export const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    parameterStart: (state) => {
      state.isfetching = true;
    },
    parameterSuccess: (
      state,
      action: PayloadAction<{
        totalStory: number;
        totalViewPage: number;
        totalUser: number;
        totalError: number;
      }>
    ) => {
      state.isfetching = false;
      state.data.totalStory = action.payload.totalStory;
      state.data.totalViewPage = action.payload.totalViewPage;
      state.data.totalUser = action.payload.totalUser;
      state.data.totalError = action.payload.totalError;
      state.error = null;
    },
    parameterFalse: (state, action) => {
      state.isfetching = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { parameterStart, parameterSuccess, parameterFalse } =
  parameterSlice.actions;

export default parameterSlice.reducer;
