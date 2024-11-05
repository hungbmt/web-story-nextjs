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

export const getListSlice = createSlice({
  name: "getList",
  initialState,
  reducers: {
    getListStart: (state) => {
      state.isFetching = true;
    },
    getListSuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome[];
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.error = null;
    },
    getListfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getListStart, getListSuccess, getListfaulse } =
  getListSlice.actions;

export default getListSlice.reducer;
