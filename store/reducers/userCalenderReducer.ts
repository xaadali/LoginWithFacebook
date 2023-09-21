import { createSlice } from "@reduxjs/toolkit";

export type userCalenderState = {
  modifyBookingSlots: Array<any>;
  userAppointmentList: Array<any>;
  count: number

};

const initialState: userCalenderState = {
  modifyBookingSlots: [],
  userAppointmentList: [],
  count : 0
};

export const UserCalenderSlice = createSlice({
  name: "UserCalender",
  initialState,
  reducers: {
    resetCompanyState: () => initialState,
    getCompanyBookingSlots: (state, action) => {
      state.modifyBookingSlots = action.payload;
    },
    getUserCalendarDatesAppointmentDetails: (state, action) => {
      state.userAppointmentList = action.payload;
    },
    getTotalcount : (state, action) => {
        state.count = action.payload;
    }
  },
});

export const { getCompanyBookingSlots, getUserCalendarDatesAppointmentDetails,getTotalcount } = UserCalenderSlice.actions;

export default UserCalenderSlice.reducer;
