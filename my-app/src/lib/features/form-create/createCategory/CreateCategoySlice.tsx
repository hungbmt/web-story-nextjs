import { typeCategory, typeGethome } from "@/type/story.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CreateCategory {
  isFetching: boolean;
  data: {
    message: string;
    data: typeCategory[];
  };
  error: string | null;
}

const initialState: CreateCategory = {
  isFetching: false,
  data: {
    message: "",
    data: [],
  },
  error: null,
};

export const CreateCategorySlice = createSlice({
  name: "CreateCategory",
  initialState,
  reducers: {
    CreateCategoryStart: (state) => {
      state.isFetching = true;
    },
    CreateCategorySuccess: (
      state,
      action: PayloadAction<{
        message: string;
        data: [];
      }>
    ) => {
      state.isFetching = false;
      state.data.message = action.payload.message;
      state.data.data = action.payload.data;
      state.error = null;
    },
    CreateCategoryfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  CreateCategoryStart,
  CreateCategorySuccess,
  CreateCategoryfaulse,
} = CreateCategorySlice.actions;

export default CreateCategorySlice.reducer;
