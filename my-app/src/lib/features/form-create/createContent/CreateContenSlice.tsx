import { typeGethome } from "@/type/story.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CreateContent {
  isFetching: boolean;
  data: typeGethome;
  error: string | null;
}

const initialState: CreateContent = {
  isFetching: false,
  data: {} as typeGethome,
  error: null,
};

export const CreateContentSlice = createSlice({
  name: "CreateContent",
  initialState,
  reducers: {
    CreateContentStart: (state) => {
      state.isFetching = true;
    },
    CreateContentSuccess: (
      state,
      action: PayloadAction<{
        data: typeGethome;
      }>
    ) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.error = null;
    },
    CreateContentfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { CreateContentStart, CreateContentSuccess, CreateContentfaulse } =
  CreateContentSlice.actions;

export default CreateContentSlice.reducer;
