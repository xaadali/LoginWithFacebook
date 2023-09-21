/* eslint-disable react-hooks/exhaustive-deps */
import modifyError from "@component/helper";
import { fetchCompanyCalender } from "@component/services/CompanyCalender";
import {
  getCompanyBookingSlots,
  getCompanyCalendarDates,
} from "@component/store/reducers/companyCalendarReducer";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface payloadAPi {
  companyId: number | string;
  day: string;
}
const UseCompanyCalender = () => {
  const dispatch = useDispatch();
  const { user, expireTimeDuration } = useSelector((state: any) => state.user);
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const [State, setState] = useState<any>();

  const [userDate, setUserDate] = useState<any>();
  const { modifyBookingSlots, calendarList } = useSelector(
    (state: any) => state.compCalendar
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleFetchDates = async () => {
    try {
      setLoading(true);
      const params: payloadAPi = {
        companyId: user?.data?.user?.id,
        day: moment(State?.start).format("dddd")
          ? moment(State?.start).format("dddd")
          : moment(new Date(userDate?.unix * 1000)).format("dddd"),
      };
      const response = await fetchCompanyCalender(params);
      let modifyArray: any = [];
      for (let index = 0; index < response?.data?.data?.length; index++) {
        const element = response?.data?.data[index];
        const formattedDate = moment(element?.bookingDate).format("YYYY-MM-DD");
        const currentDate = moment(State?.start).format("YYYY-MM-DD");
        if (currentDate === formattedDate) {
          modifyArray.push(element);
        }
      }
      dispatch(getCompanyBookingSlots(modifyArray));
      let modifyArraySelect: any = [];
      const modifyPayload = response.data?.data?.map((item, index) => {
        const formattedDate = moment(item?.bookingDate).format("YYYY-MM-DD");
        const currentDate = moment(State?.start).format("YYYY-MM-DD");
        let modifyObject = {
          id: index,
          title: `${item?.userSlot?.startTime} | ${item?.userSlot?.endTime} Appointment`,
          allDay: true,
          start: State?.start ? State?.start : new Date(),
          end: State?.start ? State?.start : new Date(),
        };
        if (currentDate === formattedDate) {
          return modifyObject;
        }
      });
      dispatch(getCompanyCalendarDates(modifyPayload));
      setLoading(false);
    } catch (error) {
      modifyError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchDates();
  }, [State, userDate]);
  return {
    loading,
    calendarList,
    modifyBookingSlots,
    setState,
    State,
    userDate,
    setUserDate,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  };
};

export default UseCompanyCalender;
