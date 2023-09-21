import { createSlice } from "@reduxjs/toolkit";

export type carState = {
  carList: Array<any>;
  specficCarDetail: object;
};

const initialState: carState = {
  carList: [],
  specficCarDetail: {},
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    getcarData: (state, action) => {
      state.carList = action.payload;
    },
    getCarSpecficDetail: (state, action) => {
      state.specficCarDetail = action.payload;
    },
  },
});

export const { getcarData, getCarSpecficDetail } = carSlice.actions;

export default carSlice.reducer;
