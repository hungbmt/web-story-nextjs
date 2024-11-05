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

export const crawlStoryMuchLinkTruyenfullSlice = createSlice({
  name: "crawlStoryMuchLink",
  initialState,
  reducers: {
    CrawlTruyenFullMuschLinkStart: (state) => {
      state.truyenfull.isFetching = true;
    },
    CrawlTruyenFullMuschLinkSuccess: (state) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = null;
    },
    CrawlTruyenFullMuschLinkFalse: (state, action) => {
      state.truyenfull.isFetching = false;
      state.truyenfull.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  CrawlTruyenFullMuschLinkStart,
  CrawlTruyenFullMuschLinkSuccess,
  CrawlTruyenFullMuschLinkFalse,
} = crawlStoryMuchLinkTruyenfullSlice.actions;

export default crawlStoryMuchLinkTruyenfullSlice.reducer;
