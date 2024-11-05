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

export const crawlStoryTruyenfullSlice = createSlice({
  name: "crawlStory",
  initialState,
  reducers: {
    CrawlTruyenfullStart: (state) => {
      state.truyenfull.isFetching = true;
    },
    CrawlTruyenfullSuccess: (state) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = null;
    },
    CrawlTruyenfullFalse: (state, action) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  CrawlTruyenfullStart,
  CrawlTruyenfullSuccess,
  CrawlTruyenfullFalse,
} = crawlStoryTruyenfullSlice.actions;

export default crawlStoryTruyenfullSlice.reducer;
