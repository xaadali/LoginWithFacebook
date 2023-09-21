import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleSend } from "@component/services/BookAppointment";
import {
  getCarSpecficDetail,
  getcarData,
} from "@component/store/reducers/carReducer";
import { getCarlisting, getSpecficCarDetail } from "@component/services/Car";
import {
  saveBookpayload,
  savePhonenumberData,
  saveCarnameData,
  saveUserNamedata,
} from "@component/store/reducers/bookAppointmentReducer";
import {
  addNewuserName,
  getuserName,
} from "@component/services/AccountSettings";
import { getUsername } from "@component/store/reducers/settings";
import { saveUserData } from "@component/store/reducers/userReducer";

const UseAppointment = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const { carList, specficCarDetail } = useSelector((state: any) => state?.car);
  const { user } = useSelector((state: any) => state?.user);
  console.log("🚀 ~ file: useAppointment.ts:32 ~ UseAppointment ~ user:", user);
  const { setitem } = useSelector((state: any) => state?.mechanic);
  const { phoneNumber, carName, username } = useSelector(
    (state: any) => state?.bookingAppointment
  );
  console.log(
    "🚀 ~ file: useAppointment.ts:34 ~ UseAppointment ~ username:",
    username
  );
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [specficLoading, setSpecficloading] = useState(false);
  const [filterBy, setFilterBy] = useState(
    carName && carName ? carName : "Select Car*"
  );
  useEffect(() => {}, [username]);
  const [phone, setPhone] = useState("");
  const formik = useFormik({
    initialValues: {
      name: username
        ? (username as string)
        : user && user
        ? (user?.data?.user?.fullName as string)
        : "",
      // contactInfo: user ? (user?.data?.user?.phoneNo as string) : "",
      contactInfo: phoneNumber && phoneNumber ? (phoneNumber as string) : "",
      comment: "",
      carName: carName && carName ? (carName as string) : "",
      // chassisNo:
      //   specficCarDetail && specficCarDetail
      //     ? (specficCarDetail.chassisNo as string)
      //     : "",
      // registrationNo:
      //   specficCarDetail && specficCarDetail
      //     ? (specficCarDetail.registrationNo as string)
      //     : "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      carName: yup.string().required("Select car is required"),
      contactInfo: yup
        .string()
        .matches(/^\+34\d{9}$/, "Valid Spanish phone number required")
        .required("Contact Information is required"),
      // chassisNo: yup.string().required("Chassis Number is required"),
      // registrationNo: yup.string().required("Registration Number is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });
  useEffect(() => {
    if (user?.data?.user?.fullName === "") {
      formik.setFieldValue("name", username);
    }
  }, []);
  const handleSubmit = async (values: any) => {
    const dropDownCarObject = carList?.data?.find(
      (item) => item?.name === values?.carName
    );

    try {
      setLoading(true);
      if (!user?.data?.user?.fullName) {
        let params = {
          name: values?.name,
          email: userEmail,
        };
        const res = await addNewuserName(params);
        if (res) {
          let modifyUsers = {
            ...user,
            data: {
              ...user.data,
              user: {
                ...user.data.user,
                fullName: values?.fullName,
              },
            },
          };
          dispatch(saveUserData(modifyUsers));
        }
      }
      let param = {
        name: values?.name,
        carName: values?.carName,
        phoneNo: values?.contactInfo,
        email: userEmail,
        chassisNo: dropDownCarObject?.chassisNo,
        // specficCarDetail && specficCarDetail
        //   ? (specficCarDetail.chassisNo as string)
        //   : "",
        registrationNo: dropDownCarObject?.registrationNo,
        // specficCarDetail && specficCarDetail
        //   ? (specficCarDetail.registrationNo as string)
        //   : "",
        comment: values?.comment,
        userId: userid,
        companyId: setitem?.companyId,
        bookingDate: moment(setitem?.bookingSlotdate).format("YYYY-MM-DD"),
        userSlot: {
          day: setitem?.day,
          slotId: setitem?.slotId,
          startTime: setitem?.startTime,
          endTime: setitem?.endTime,
        },
      };
      console.log(
        "🚀 ~ file: useAppointment.ts:141 ~ handleSubmit ~ param:",
        param
      );
      dispatch(saveBookpayload(param));
      // const res = await handleSend(userEmail, values?.contactInfo);
      setLoading(false);
      formik.resetForm();
      // toast.success(res?.data?.message);
      location.push("/confirm-appointment");
      dispatch(getCarSpecficDetail(null));
    } catch (error) {
      setLoading(false);
      if (Array.isArray(error?.response?.data?.message)) {
        toast.error(error?.response?.data?.message[0]);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const getlisting = async () => {
    try {
      const res = await getCarlisting(userid);
      dispatch(getcarData(res?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (carList.length === 0) {
      getlisting();
    }
  }, []);

  const handlegetDetail = async (name: string) => {
    setSpecficloading(true);
    dispatch(getCarSpecficDetail(null));
    let findId = carList?.data?.find((item: any) => {
      if (item?.name === name) return item;
    });
    try {
      const res = await getSpecficCarDetail(findId?.carId);
      dispatch(getCarSpecficDetail(res?.data?.data));
      setSpecficloading(false);
    } catch (error) {
      setSpecficloading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const getName = async (email: string) => {
    try {
      const res = await getuserName(email);
      dispatch(getUsername(res?.data?.name));
      let modifyUsers = {
        ...user,
        data: {
          ...user.data,
          user: {
            ...user.data.user,
            fullName: res?.data?.name,
          },
        },
      };
      dispatch(saveUserData(modifyUsers));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (!user?.data?.user?.fullName) {
      getName(userEmail);
    }
  }, []);
  return {
    formik,
    loading,
    setitem,
    filterBy,
    setFilterBy,
    carList,
    handlegetDetail,
    setPhone,
    savePhonenumberData,
    saveUserNamedata,
    dispatch,
    saveCarnameData,
    specficCarDetail,
    user,
    specficLoading,
  };
};

export default UseAppointment;
