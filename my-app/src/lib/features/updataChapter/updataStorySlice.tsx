import { typeGethome } from "@/type/story.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface updataChapter {
    isFetching: boolean;
    data: {
        message: string;
    };
    error: string | null;
}

const initialState: updataChapter = {
    isFetching: false,
    data: {
        message: "",
    },
    error: null,
};

export const updataChapterSlice = createSlice({
    name: "updataChapter",
    initialState,
    reducers: {
        updataChapterStart: (state) => {
            state.isFetching = true;
        },
        updataChapterSuccess: (state, action: PayloadAction<string>) => {
            state.isFetching = false;
            state.data.message = action.payload;
            state.error = null;
        },
        updataChapterFalse: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    updataChapterStart,
    updataChapterSuccess,
    updataChapterFalse,
} = updataChapterSlice.actions;

export default updataChapterSlice.reducer;
