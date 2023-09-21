import { createSlice } from "@reduxjs/toolkit";

export type bookingState = {
  searchingList: any;
  lookFordata: object;
  count: number;
  slotDetail: object;
  bookAppointmentpayload: object;
  phoneNumber: string;
  carName: string;
  sortLoader: boolean;
  username: string;
  Reload: boolean;
  compoentLoader: boolean;
};

const initialState: bookingState = {
  searchingList: [],
  lookFordata: {},
  count: 0,
  slotDetail: {},
  bookAppointmentpayload: {},
  phoneNumber: "",
  carName: "",
  sortLoader: false,
  username: "",
  Reload: false,
  compoentLoader: false,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    getsearchingData: (state, action) => {
      state.searchingList = action.payload;
    },
    setLookforData: (state, action) => {
      state.lookFordata = action.payload;
    },
    setCountofLookingData: (state, action) => {
      state.count = action.payload;
    },
    saveSlotDetail: (state, action) => {
      state.slotDetail = action.payload;
    },
    saveBookpayload: (state, action) => {
      state.bookAppointmentpayload = action.payload;
    },
    savePhonenumberData: (state, action) => {
      state.phoneNumber = action.payload;
    },
    saveUserNamedata: (state, action) => {
      state.username = action.payload;
    },
    saveCarnameData: (state, action) => {
      state.carName = action.payload;
    },
    sortLoading: (state, action) => {
      state.sortLoader = action.payload;
    },
    saveReload: (state, action) => {
      state.Reload = action.payload;
    },
    setComponantLoader: (state, action) => {
      state.compoentLoader = action.payload;
    },
  },
});

export const {
  getsearchingData,
  setLookforData,
  setCountofLookingData,
  saveSlotDetail,
  saveBookpayload,
  savePhonenumberData,
  saveCarnameData,
  sortLoading,
  saveUserNamedata,
  saveReload,
  setComponantLoader,
} = bookingSlice.actions;

export default bookingSlice.reducer;
