import { createSlice } from "@reduxjs/toolkit";

export type bookingListState = {
  bookingList: Array<any>;
};

const initialState: bookingListState = {
  bookingList: [],
};

export const bookingManagementSlice = createSlice({
  name: "bookingManagement",
  initialState,
  reducers: {
    resetBookingState: (state) => initialState,
    saveBookingDetail: (state, action) => {
      state.bookingList = action.payload;
    },
  },
});

export const { saveBookingDetail } = bookingManagementSlice.actions;

export default bookingManagementSlice.reducer;
