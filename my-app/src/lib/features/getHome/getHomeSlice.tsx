import { typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface getHomeState {
  isfetching: boolean;
  data: {
    dataNew: typeGethome[];
    dataUpdate: typeGethome[];
    dataStorySuccess: typeGethome[];
    topView: {
      viewDay: typeGethome[];
      viewToday: typeGethome[];
      viewmoth: typeGethome[];
      viewyear: typeGethome[];
    };
  };
  error: string | null;
}

const initialState: getHomeState = {
  isfetching: false,
  data: {
    dataNew: [], // Khởi tạo dataNew là một mảng rỗng
    dataUpdate: [], // Khởi tạo dataUpdate là một mảng rỗng
    dataStorySuccess: [], // Khởi tạo dataStorySuccess là một mảng rỗng
    topView: {
      viewDay: [], // Khởi tạo viewDay là một mảng rỗng
      viewToday: [], // Khởi tạo viewToday là một mảng rỗng
      viewmoth: [], // Khởi tạo viewMonth là một mảng rỗng (sửa chính tả từ viewmoth thành viewMonth)
      viewyear: [], // Khởi tạo viewYear là một mảng rỗng
    },
  },
  error: null,
};

export const getHomeSlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    getHomeStart: (state) => {
      state.isfetching = true;
    },
    getHomeSuccess: (
      state,
      action: PayloadAction<{
        dataNew: typeGethome[];
        dataUpdate: typeGethome[];
        dataStorySuccess: typeGethome[];
        topView: {
          viewDay: typeGethome[];
          viewToday: typeGethome[];
          viewmoth: typeGethome[];
          viewyear: typeGethome[];
        };
      }>
    ) => {
      state.isfetching = false;
      state.data.dataNew = action.payload.dataNew;
      state.data.dataUpdate = action.payload.dataUpdate;
      state.data.dataStorySuccess = action.payload.dataStorySuccess;
      state.data.topView.viewDay = action.payload.topView.viewDay;
      state.data.topView.viewToday = action.payload.topView.viewToday;
      state.data.topView.viewmoth = action.payload.topView.viewmoth;
      state.data.topView.viewyear = action.payload.topView.viewyear;
      state.error = null;
    },
    getHomeFalse: (state, action) => {
      state.isfetching = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getHomeStart, getHomeSuccess, getHomeFalse } =
  getHomeSlice.actions;

export default getHomeSlice.reducer;
