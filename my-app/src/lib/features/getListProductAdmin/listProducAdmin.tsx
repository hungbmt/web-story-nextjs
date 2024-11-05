import {  typeGethome } from "@/type/story.type";
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

export const listProductAdminSlice = createSlice({
  name: "listProductAdmin",
  initialState,
  reducers: {
    listProductAdminStart: (state) => {
      state.isFetching = true;
    },
    listProductAdminSuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome[];
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.error = null;
    },
    listProductAdminfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  listProductAdminStart,
  listProductAdminSuccess,
  listProductAdminfaulse,
} = listProductAdminSlice.actions;

export default listProductAdminSlice.reducer;
