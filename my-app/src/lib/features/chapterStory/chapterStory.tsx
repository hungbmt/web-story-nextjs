import { typechapter } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
interface typeSlice {
  isFetching: boolean;

  data: {
    data: typechapter;
  };
  error: string | null;
}

const initialState: typeSlice = {
  isFetching: false,

  data: {
    data: {} as typechapter,
  },
  error: null,
};

export const chapterStorySlice = createSlice({
  name: "chapterStory",
  initialState,
  reducers: {
    chapterStoryStart: (state) => {
      state.isFetching = true;
    },
    chapterStorySuccess: (
      state,
      action: PayloadAction<{
        data: typechapter;
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.error = null;
    },
    chapterStoryfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { chapterStoryStart, chapterStorySuccess, chapterStoryfaulse } =
  chapterStorySlice.actions;

export default chapterStorySlice.reducer;
