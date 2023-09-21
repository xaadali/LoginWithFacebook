import { combineReducers, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import {
  Action,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import userSlice from "./reducers/userReducer";
import carSlice from "./reducers/carReducer";
import bookingManagementSlice from "./reducers/companyBookingReducer";
import planSlice from "./reducers/planReducer";
import questionSlice from "./reducers/questionReducer";
import reviewSlice from "./reducers/reviewReducer";
import CompanyCalenderSlice from "./reducers/companyCalendarReducer";
import mechanicSlice from "./reducers/mechanic";
import settingSlice from "./reducers/settings";
import bookingSlice from "./reducers/bookAppointmentReducer";
import UserCalenderSlice from "./reducers/userCalenderReducer";
import notificationsSlice from "./reducers/notificationsSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "mechanic", "bookingAppointment", "notifications"],
  blacklist: [],
  transforms: [],
};

const reducers = combineReducers({
  user: userSlice,
  car: carSlice,
  plan: planSlice,
  question: questionSlice,
  review: reviewSlice,
  booking: bookingManagementSlice,
  compCalendar: CompanyCalenderSlice,
  mechanic: mechanicSlice,
  accSetting: settingSlice,
  bookingAppointment: bookingSlice,
  userCalender: UserCalenderSlice,
  notifications: notificationsSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
}).concat(ReduxThunk);

let enhancedCompose = compose;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
