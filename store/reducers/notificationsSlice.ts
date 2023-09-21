import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice: any = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state: any, action: any) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter(
        (notification: any) =>
          notification?.data?.["gcm.notification.chatRoomId"] !==
          action?.payload?.messageId
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
