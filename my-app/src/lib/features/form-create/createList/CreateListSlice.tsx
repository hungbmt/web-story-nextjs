import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CreateList {
  isFetching: boolean;
  data: {
    message: string;
  };
  error: string | null;
}

const initialState: CreateList = {
  isFetching: false,
  data: {
    message: "",
  },
  error: null,
};

export const CreateListSlice = createSlice({
  name: "CreateList",
  initialState,
  reducers: {
    CreateListStart: (state) => {
      state.isFetching = true;
    },
    CreateListSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.data.message = action.payload;
      state.error = null;
    },
    CreateListfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { CreateListStart, CreateListSuccess, CreateListfaulse } =
  CreateListSlice.actions;

export default CreateListSlice.reducer;
