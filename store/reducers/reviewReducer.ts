import { createSlice } from "@reduxjs/toolkit";

export type reviewState = {
  reviewDetails: any;
};

const initialState: reviewState = {
  reviewDetails: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewState: (state) => initialState,
    saveReviewData: (state, action) => {
      state.reviewDetails = action.payload;
    },


  },
});

export const {
  resetReviewState,
  saveReviewData
} = reviewSlice.actions;

export default reviewSlice.reducer;
