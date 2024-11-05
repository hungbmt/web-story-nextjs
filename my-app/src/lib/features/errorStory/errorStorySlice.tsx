import { typeErrorStory} from "@/type/story.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface typeSlice {
    isFetching: boolean;
    data: {
        data: typeErrorStory[];
    };
    error: string | null;
}

const initialState: typeSlice = {
    isFetching: false,
    data: {
        data: [],
    },
    error: null,
};

export const getErrorSlice = createSlice({
    name: "getError",
    initialState,
    reducers: {
        getErrorStart: (state)   => {
            state.isFetching = true;
        },
        getErrorSuccess: (
            state,
            action: PayloadAction<{
                data: typeErrorStory[];
            }>
        ) => {
            state.isFetching = false;
            state.data.data = action.payload.data;
            state.error = null;
        },
        getErrorfaulse: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    getErrorStart,
    getErrorSuccess,
    getErrorfaulse,
} = getErrorSlice.actions;

export default getErrorSlice.reducer;
