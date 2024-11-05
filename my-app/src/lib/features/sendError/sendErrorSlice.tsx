import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface sendError {
  isFetching: boolean;
  data: {
    message: string;
  };
  error: string | null;
}

const initialState: sendError = {
  isFetching: false,
  data: {
    message: "",
  },
  error: null,
};

export const sendErrorSlice = createSlice({
  name: "sendError",
  initialState,
  reducers: {
    sendErrorStart: (state) => {
      state.isFetching = true;
    },
    sendErrorSuccess: (
      state,
      action: PayloadAction<{
        message: string;
      }>
    ) => {
      state.isFetching = false;
      state.data.message = action.payload.message;
      state.error = null;
    },
    sendErrorfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { sendErrorStart, sendErrorSuccess, sendErrorfaulse } =
  sendErrorSlice.actions;

export default sendErrorSlice.reducer;
