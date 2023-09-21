import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  handleConfirmcode,
  handleResendcode,
  searchWorkshop,
} from "@component/services/BookAppointment";
import { addAppointment } from "@component/services/BookAppointment";
import {
  getsearchingData,
  setComponantLoader,
  setCountofLookingData,
  setLookforData,
} from "@component/store/reducers/bookAppointmentReducer";
import { getDay } from "@component/utills/dates";

const UseConfirmBooking = () => {
  const { user } = useSelector((state: any) => state?.user);
  const { bookAppointmentpayload, lookFordata } = useSelector(
    (state: any) => state?.bookingAppointment
  );
  const { setitem } = useSelector((state: any) => state?.mechanic);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const dispatch = useDispatch();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [togglePage, setTogglepage] = useState(false);
  const [data, setData] = useState<any>({});
  const [popupvisible, setpopupvisible] = useState<boolean>(false);
  const [btnLoading, setBtnloading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      pinCode: "",
    },
    validationSchema: yup.object({
      pinCode: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Pin Code is required")
        .max(6, "Digits Should be of 6 numbers")
        .min(6, "Digits Should not be less then 6 numbers"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // setTogglepage(!togglePage);
      let params = {
        email: userEmail,
        recipient: bookAppointmentpayload?.phoneNo,
        code: values?.pinCode,
      };
      // const res = await handleConfirmcode(params);
      // toast.success(res?.data?.message);
      // if (res) {
      const modifyObject = {
        bookingDate: moment(new Date()).format("YYYY-MM-DD"),
        ...bookAppointmentpayload,
      };
      const resposne = await addAppointment(bookAppointmentpayload);
      setData(resposne?.data?.data[0]);
      toast.success(resposne?.data?.message);
      setpopupvisible(!popupvisible);
      dispatch(bookAppointmentpayload(null));
      // }
      formik.resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const hanldeReturnhome = () => {
    location.push("/");
  };
  const handleSendagian = async () => {
    try {
      let params = {
        email: userEmail,
        recipient: bookAppointmentpayload?.contactInfo,
        code: formik?.values?.pinCode,
      };
      const res = await handleResendcode(params);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const navigaetBooking = () => {
    let params = {
      category: "",
      subcategory: "",
      country: "spain",
      lat: "",
      lng: "",
      address: "",
    };
    dispatch(setLookforData(params));
    location.push("/dashboard");
  };
  const navigateTosearching = async () => {
    setBtnloading(true);
    setComponantLoader(true);
    const day = getDay(new Date());
    const convertToSelectedDate = moment(new Date()).format("YYYY-MM-DD H:mm");
    setLoading(true);
    const response = await searchWorkshop(
      lookFordata?.category,
      lookFordata?.subcategory,
      lookFordata?.country,
      day,
      convertToSelectedDate,
      lookFordata?.lat,
      lookFordata?.lng,
      lookFordata?.radius,
      lookFordata?.address
    );
    dispatch(getsearchingData(response?.data?.data));
    dispatch(setCountofLookingData(response?.data?.count));
    setComponantLoader(false);
    setpopupvisible;
    location.push("/search-booking");
    setBtnloading(false);
  };
  return {
    formik,
    loading,
    popupvisible,
    setpopupvisible,
    setTogglepage,
    togglePage,
    hanldeReturnhome,
    bookAppointmentpayload,
    handleSendagian,
    data,
    navigaetBooking,
    navigateTosearching,
    setitem,
    btnLoading,
  };
};

export default UseConfirmBooking;
