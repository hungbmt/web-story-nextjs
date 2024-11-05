import { typechapter, typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface getsubpage {
  isFetching: boolean;
  data: {
    data: typeGethome;
    chapter: typechapter[];
    totalChapter: Number;
    curenPage: Number;
    totalPage: Number;
  };
  error: string | null;
}

const initialState: getsubpage = {
  isFetching: false,
  data: {
    data: {} as typeGethome,
    chapter: [],
    totalChapter: 0,
    curenPage: 0,
    totalPage: 0,
  },
  error: null,
};

export const subpageSlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    getSubpageStart: (state) => {
      state.isFetching = true;
    },
    getSubpageSuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome;
        chapter: typechapter[];
        totalChapter: Number;
        curenPage: Number;
        totalPage: Number;
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.data.chapter = action.payload.chapter;
      state.data.totalChapter = action.payload.totalChapter;
      state.data.curenPage = action.payload.curenPage;
      state.data.totalPage = action.payload.totalPage;
      state.error = null;
    },
    getSubpagefaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getSubpageStart, getSubpageSuccess, getSubpagefaulse } =
  subpageSlice.actions;

export default subpageSlice.reducer;
