import { typechapter, typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface typeSlice {
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

const initialState: typeSlice = {
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

export const relatedStorySlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    relatedStoryStart: (state) => {
      state.isFetching = true;
    },
    relatedStorySuccess: (
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
    relatedStoryfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { relatedStoryStart, relatedStorySuccess, relatedStoryfaulse } =
  relatedStorySlice.actions;

export default relatedStorySlice.reducer;
