import { typechapter, typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface dataUpdata {
  isFetching: boolean;
  data: {
    data: typeGethome;
    chapter: typechapter[];
    totalChapter: Number;
    currentPage: Number;
    totalPage: Number;
  };
  error: string | null;
}

const initialState: dataUpdata = {
  isFetching: false,
  data: {
    data: {} as typeGethome,
    chapter: [],
    totalChapter: 0,
    currentPage: 0,
    totalPage: 0,
  },
  error: null,
};

export const dataUpdataSlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    dataUpdataStart: (state) => {
      state.isFetching = true;
    },
    dataUpdataSuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome;
        chapter: typechapter[];
        totalChapter: Number;
        currentPage: Number;
        totalPage: Number;
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.data.chapter = action.payload.chapter;
      state.data.totalChapter = action.payload.totalChapter;
      state.data.currentPage = action.payload.currentPage;
      state.data.totalPage = action.payload.totalPage;
      state.error = null;
    },
    dataUpdatafaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { dataUpdataStart, dataUpdataSuccess, dataUpdatafaulse } =
  dataUpdataSlice.actions;

export default dataUpdataSlice.reducer;
