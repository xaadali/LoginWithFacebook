import { createSlice } from "@reduxjs/toolkit";

export type settingState = {
  userName: string;
};

const initialState: settingState = {
    userName:"",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getUsername: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { getUsername } = settingSlice.actions;

export default settingSlice.reducer;
