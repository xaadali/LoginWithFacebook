import { createSlice } from "@reduxjs/toolkit";

export type MechanicState = {
  fvrtMechanicList: Array<any>;
  specficMechanicdetail: object;
  setitem: object;
  setTrue: boolean;
  count: number;
};

const initialState: MechanicState = {
  fvrtMechanicList: [],
  specficMechanicdetail: {},
  setitem: {},
  setTrue: false,
  count: 0,
};

export const mechanicSlice = createSlice({
  name: "mechanic",
  initialState,
  reducers: {
    getallFvrtMechanicData: (state, action) => {
      state.fvrtMechanicList = action.payload;
    },
    getSpecficDetailMechanic: (state, action) => {
      state.specficMechanicdetail = action.payload;
    },
    setFavouriteitem: (state, action) => {
      state.setitem = action.payload;
    },
    setTruestate: (state, action) => {
      state.setTrue = action.payload;
    },
    setTotalcount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {
  getallFvrtMechanicData,
  getSpecficDetailMechanic,
  setFavouriteitem,
  setTruestate,
  setTotalcount,
} = mechanicSlice.actions;

export default mechanicSlice.reducer;
