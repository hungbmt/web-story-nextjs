import { typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface typeSlice {
  truyenfull: {
    isFetching: boolean;
    error: string | null;
  };
}

const initialState: typeSlice = {
  truyenfull: {
    isFetching: false,
    error: null,
  },
};

export const crawlbyCategoryStoryTruyenfullSlice = createSlice({
  name: "crawlbyCtegoryStory",
  initialState,
  reducers: {
    crawlbyCategoryTruyenfullStart: (state) => {
      state.truyenfull.isFetching = true;
    },
    crawlbyCategoryTruyenfullSuccess: (state) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = null;
    },
    crawlbyCategoryTruyenfullFalse: (state, action) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  crawlbyCategoryTruyenfullStart,
  crawlbyCategoryTruyenfullSuccess,
  crawlbyCategoryTruyenfullFalse,
} = crawlbyCategoryStoryTruyenfullSlice.actions;

export default crawlbyCategoryStoryTruyenfullSlice.reducer;
