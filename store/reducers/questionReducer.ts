import { createSlice } from "@reduxjs/toolkit";

export type questionState = {
  questionDetails: any;
};

const initialState: questionState = {
  questionDetails: []
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    resetQuestionState: (state) => initialState,
    saveQuestionsData: (state, action) => {
      state.questionDetails = action.payload;
    }
  },
});

export const {
  saveQuestionsData,
  resetQuestionState
} = questionSlice.actions;

export default questionSlice.reducer;
