import { typechapter, typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface typeSlice {
  isFetching: boolean;
  data: {
    data: typeGethome[];
  };
  error: string | null;
}

const initialState: typeSlice = {
  isFetching: false,
  data: {
    data: [],
  },
  error: null,
};

export const GetCategorySlice = createSlice({
  name: "getCategory",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isFetching = true;
    },
    getCategorySuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome[];
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.error = null;
    },
    getCategoryfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryfaulse } =
  GetCategorySlice.actions;

export default GetCategorySlice.reducer;
