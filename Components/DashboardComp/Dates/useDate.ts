import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  getDates,
  getSpecficappoitmentData,
  handleCancelappointment,
} from "@component/services/Dates";
import {
  getTotalcount,
  getUserCalendarDatesAppointmentDetails,
} from "@component/store/reducers/userCalenderReducer";

const useDate = (toogleState?: any, specficData?: any) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { user } = useSelector((state: any) => state?.user);
  const { userAppointmentList } = useSelector(
    (state: any) => state?.userCalender
  );
  const { count } = useSelector((state: any) => state?.userCalender);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [data, setData] = useState<any>({});
  const [popupvisible, setpopupvisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelloading] = useState(false);
  const [reload, setReload] = useState(false);
  const [delAppointmentloading, setDelappointmentLoading] = useState(false);
  const handleEventSelected = (evt) => {
    setData(evt);
    setpopupvisible(!popupvisible);
  };

  const getAppointmentDates = async () => {
    try {
      setLoading(true);
      const date = new Date();
      const year = date.getFullYear(); // 2023
      const month = date.getMonth() + 1;
      const res = await getDates(userid, month, year);
      setEvents(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAppointmentDates();
  }, [reload]);
  const handleDeleteAppointment = async (item: any) => {
    try {
      setDelappointmentLoading(true);
      const combinedBookingStartTime = moment(
        `${item?.bookingDate} ${item?.userSlot?.startTime}`,
        "YYYY-MM-DD h:mm a"
      ).toISOString();
      let params = {
        userId: userid,
        companyId: item?.companyId,
        bookingId: item?.bookingId,
        slotId: item?.userSlot?.slotId,
        day: item?.userSlot?.day,
        // bookingDate: item?.bookingDate,
        bookingDate: combinedBookingStartTime,
        today: new Date(),
      };
      const res = await handleCancelappointment(params);
      setDelappointmentLoading(false);
      setData({});
      getAppointmentDates();
      toogleState(false);
      setpopupvisible(!popupvisible);
      toast.success(res?.data?.message);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      setDelappointmentLoading(false);
      setData({});
      toogleState(false);
      setpopupvisible(!popupvisible);
      toast.error(error?.response?.data?.message);
      setReload(false);
    }
  };
  const getSpecficData = async () => {
    try {
      setDelloading(true);
      const res = await getSpecficappoitmentData(
        userid,
        specficData?.bookingDate
      );
      dispatch(getTotalcount(res?.data?.count));
      dispatch(getUserCalendarDatesAppointmentDetails(res?.data?.data));
      setDelloading(false);
    } catch (error) {
      setDelloading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (specficData) {
      getSpecficData();
    }
  }, []);
  return {
    handleDeleteAppointment,
    setpopupvisible,
    popupvisible,
    loading,
    handleEventSelected,
    data,
    events,
    userAppointmentList,
    count,
    setDelloading,
    delLoading,
    delAppointmentloading,
  };
};

export default useDate;
