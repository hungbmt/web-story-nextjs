import { typeGethome } from "@/type/story.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DeleteContent {
  isFetching: boolean;
  data: {
    message: string;
  };
  error: string | null;
}

const initialState: DeleteContent = {
  isFetching: false,
  data: {
    message: "",
  },
  error: null,
};

export const DeleteContentSlice = createSlice({
  name: "DeleteContent",
  initialState,
  reducers: {
    DeleteContentStart: (state) => {
      state.isFetching = true;
    },
    DeleteContentSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.data.message = action.payload;
      state.error = null;
    },
    DeleteContentfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  DeleteContentStart,
  DeleteContentSuccess,
  DeleteContentfaulse,
} = DeleteContentSlice.actions;

export default DeleteContentSlice.reducer;
