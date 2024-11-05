import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
interface CreateChapter {
  isFetching: boolean;
  data: string;
  error: string | null;
}

const initialState: CreateChapter = {
  isFetching: false,
  data: "",
  error: null,
};

export const CreateChapterSlice = createSlice({
  name: "CreateChapter",
  initialState,
  reducers: {
    CreateChapterStart: (state) => {
      state.isFetching = true;
    },
    CreateChapterSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = null;
    },
    CreateChapterfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { CreateChapterStart, CreateChapterSuccess, CreateChapterfaulse } =
  CreateChapterSlice.actions;

export default CreateChapterSlice.reducer;
