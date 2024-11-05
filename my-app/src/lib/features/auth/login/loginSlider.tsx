import { typeAuth } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface typeSlice {
  isFetching: boolean;

  data: {
    data: typeAuth;
    message: string;
    AccessToken: string;
    RefreshToken: string;
  };
  error: string | null;
}

const initialState: typeSlice = {
  isFetching: false,

  data: {
    data: {} as typeAuth,
    message: "",
    AccessToken: "",
    RefreshToken: "",
  },
  error: null,
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    LoginStart: (state) => {
      state.isFetching = true;
    },
    LoginSuccess: (
      state,
      action: PayloadAction<{
        data: typeAuth;
        message: string;
        AccessToken: string;
        RefreshToken: string;
      }>
    ) => {
      state.isFetching = false;
      state.data.data = action.payload.data;
      state.data.message = action.payload.message;
      state.data.AccessToken = action.payload.AccessToken;
      state.data.RefreshToken = action.payload.RefreshToken;
      state.error = null;
    },
    Loginfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { LoginStart, LoginSuccess, Loginfaulse } = LoginSlice.actions;

export default LoginSlice.reducer;
