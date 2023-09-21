import { createSlice } from "@reduxjs/toolkit";

export type planState = {
  plansDetails: any;
  tempPlanInfo: object;
  currentPlanInfo: object;
  getOfferamount: any;
  payableAmount: any;
  SelectedPlan: any;
};

const initialState: planState = {
  plansDetails: [],
  tempPlanInfo: {},
  currentPlanInfo: {},
  getOfferamount: "",
  payableAmount: null,
  SelectedPlan: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    resetPlansState: (state) => initialState,
    savePlansData: (state, action) => {
      state.plansDetails = action.payload;
    },
    saveTempPlan: (state, action) => {
      state.tempPlanInfo = action.payload;
    },
    saveCurrentPlan: (state, action) => {
      state.currentPlanInfo = action.payload;
    },
    getAmount: (state, action) => {
      state.getOfferamount = action.payload;
    },
    setPayableAmount: (state, action) => {
      state.payableAmount = action.payload;
    },
    setSelectedplan: (state, action) => {
      state.SelectedPlan = action.payload;
    },
  },
});

export const {
  savePlansData,
  saveTempPlan,
  saveCurrentPlan,
  getAmount,
  setPayableAmount,
  setSelectedplan,
} = planSlice.actions;

export default planSlice.reducer;
