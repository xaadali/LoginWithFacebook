import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  accessToken: string | null;
  user: any;
  LoginAs: string;
  SSOType: string;
  logout: boolean;
  compSidebar: string;
  planTitle: string;
  updateCompName: string;
  updateCompImage: string;
  splashLoader: boolean;
  firbaseToken: string;
  expireTimeDuration: boolean;
  compMessageData: any;
  serviceWorker: boolean;
  isRead: boolean;
  notificationUserData: null | {
    chatRoomId: string;
    otherUserId: string;
    userId: string;
    selectedChatRoomId: string;
  };
};

const initialState: userState = {
  accessToken: "",
  user: null,
  LoginAs: "",
  SSOType: "",
  logout: false,
  compSidebar: "My Workshop",
  planTitle: "",
  updateCompName: "",
  updateCompImage: "",
  splashLoader: false,
  firbaseToken: "",
  expireTimeDuration: false,
  compMessageData: null,
  serviceWorker: false,
  notificationUserData: null,
  isRead: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => initialState,
    saveUserData: (state, action) => {
      state.user = action.payload;
      state.planTitle = action.payload?.data?.user?.planTitle;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveServiceWorker: (state, action) => {
      state.serviceWorker = action.payload;
    },
    saveUserType: (state, action) => {
      state.LoginAs = action.payload;
    },
    saveSSOType: (state, action) => {
      state.SSOType = action.payload;
    },
    setLogout: (state, action) => {
      state.logout = action.payload;
    },
    saveSidebar: (state, action) => {
      state.compSidebar = action.payload;
    },
    saveCompName: (state, action) => {
      state.updateCompName = action.payload;
    },
    saveCompImage: (state, action) => {
      state.updateCompImage = action.payload;
    },
    setSplashLoader: (state, action) => {
      state.splashLoader = action.payload;
    },
    saveFirebaseToken: (state, action) => {
      state.firbaseToken = action.payload;
    },
    saveExpireTimeDuration: (state, action) => {
      state.expireTimeDuration = action.payload;
    },
    saveCompMessageData: (state, action) => {
      state.compMessageData = action.payload;
    },
    saveNotificationUserData: (state, action) => {
      state.notificationUserData = action.payload;
    },
    saveIsRead: (state, action) => {
      state.isRead = action.payload;
    },
  },
});

export const {
  saveAccessToken,
  resetUserState,
  saveUserData,
  saveUserType,
  saveSSOType,
  setLogout,
  saveSidebar,
  saveCompName,
  saveCompImage,
  setSplashLoader,
  saveFirebaseToken,
  saveExpireTimeDuration,
  saveCompMessageData,
  saveServiceWorker,
  saveNotificationUserData,
  saveIsRead,
} = userSlice.actions;

export default userSlice.reducer;
