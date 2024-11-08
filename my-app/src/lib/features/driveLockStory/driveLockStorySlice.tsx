import { typeGethome } from "@/type/story.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface driveLockStory {
  isFetching: boolean;
  data: {
    message: string;
  };
  error: string | null;
}

const initialState: driveLockStory = {
  isFetching: false,
  data: {
    message: "",
  },
  error: null,
};

export const driveLockStorySlice = createSlice({
  name: "driveLockStory",
  initialState,
  reducers: {
    driveLockStoryStart: (state) => {
      state.isFetching = true;
    },
    driveLockStorySuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.data.message = action.payload;
      state.error = null;
    },
    driveLockStoryFalse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  driveLockStoryStart,
  driveLockStorySuccess,
  driveLockStoryFalse,
} = driveLockStorySlice.actions;

export default driveLockStorySlice.reducer;
