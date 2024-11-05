import { typechapter, typeGethome } from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";

{
  /* totalPage,currenPage,rangePage,Hostpage, */
}

interface getproductCategory {
  name: string;
  isFetching: boolean;
  data: typeGethome[];
  totalPage: number;
  curentPage: number;
  totalStory: number;
  error: string | null;
}

const initialState: getproductCategory = {
  isFetching: false,
  name: "",
  data: [],
  totalPage: 0,
  curentPage: 0,
  totalStory: 0,
  error: null,
};

export const getproductCategorySlice = createSlice({
  name: "getHome",
  initialState,
  reducers: {
    getproductCategoryStart: (state) => {
      state.isFetching = true;
    },
    getproductCategorySuccess: (
      state,
      action: PayloadAction<{
        name: string;
        data: typeGethome[];
        totalPage: number;
        curentPage: number;
        totalStory: number;
      }>
    ) => {
      state.isFetching = false;
      state.name = action.payload.name;
      state.data = action.payload.data;
      state.curentPage = action.payload.curentPage;
      state.totalPage = action.payload.totalPage;
      state.totalStory = action.payload.totalStory;
      state.error = null;
    },
    getproductCategoryfaulse: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getproductCategoryStart,
  getproductCategorySuccess,
  getproductCategoryfaulse,
} = getproductCategorySlice.actions;

export default getproductCategorySlice.reducer;
