import { createSlice } from "@reduxjs/toolkit";

export type CompanyCalenderState = {
  modifyBookingSlots: Array<any>;
  calendarList: Array<any>;
  showBanner: boolean;
};

const initialState: CompanyCalenderState = {
  modifyBookingSlots: [],
  calendarList: [],
  showBanner: false,
};

export const CompanyCalenderSlice = createSlice({
  name: "CompanyCalender",
  initialState,
  reducers: {
    resetCompanyState: () => initialState,
    getCompanyBookingSlots: (state, action) => {
      state.modifyBookingSlots = action.payload;
    },
    getCompanyCalendarDates: (state, action) => {
      state.calendarList = action.payload;
    },
    showBanneronCompanyside: (state, action) => {
      state.showBanner = action.payload;
    },
  },
});

export const {
  getCompanyBookingSlots,
  getCompanyCalendarDates,
  showBanneronCompanyside,
} = CompanyCalenderSlice.actions;

export default CompanyCalenderSlice.reducer;
