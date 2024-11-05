import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface updataStory {
  isFetching: boolean;
  data: {
    message: string;
  };
  error: string | null;
}

const initialState: updataStory = {
  isFetching: false,
  data: {
    message: "",
  },
  error: null,
};

export const updataStorySlice = createSlice({
  name: "updataStory",
  initialState,
  reducers: {
    updataStoryStart: (state) => {
      state.isFetching = true;
    },
    updataStorySuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.data.message = action.payload;
      state.error = null;
    },
    updataStoryFalse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { updataStoryStart, updataStorySuccess, updataStoryFalse } =
  updataStorySlice.actions;

export default updataStorySlice.reducer;
