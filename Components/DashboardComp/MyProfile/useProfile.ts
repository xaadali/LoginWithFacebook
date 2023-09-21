import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import modifyError from "@component/helper";
import { changeCompanyName } from "@component/services/AccountSettings";
import {
  saveCompName,
  saveUserData,
} from "@component/store/reducers/userReducer";

const useProfileSettings = () => {
  const { user, expireTimeDuration } = useSelector((state: any) => state.user);
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const dispatch = useDispatch();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [popupvisible, setpopupvisible] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState<{
    name: string;
    phoneNumber: number;
  }>({
    name: "",
    phoneNumber: 0,
  });
  const formik = useFormik({
    initialValues: {
      name: profileUpdate?.name
        ? profileUpdate?.name
        : user?.data?.user?.fullName
        ? (user?.data?.user?.fullName as string)
        : "",
      phone: profileUpdate?.phoneNumber
        ? profileUpdate?.phoneNumber
        : user?.data?.user?.phoneNo
        ? (user?.data?.user?.phoneNo as string)
        : "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().max(255),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        name: values.name,
        email: user?.data?.user?.email,
        phoneNo: values.phone,
      };
      const response = await changeCompanyName(params);
      let modifyUsers = {
        ...user,
        data: {
          ...user.data,
          user: {
            ...user.data.user,
            fullName: response?.data?.name,
          },
        },
      };
      dispatch(saveCompName(response?.data?.name));
      setProfileUpdate({
        name: response?.data?.name,
        phoneNumber: response?.data?.phoneNo,
      });
      dispatch(saveUserData(modifyUsers));
      toast.success(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modifyError(error);
    }
  };

  const handleChangePassword = () => {
    location.push("/change-password");
  };
  const handleChangeEmail = () => {
    location.push("/change-email");
  };
  const handleAccount = () => {
    setpopupvisible(!popupvisible);
  };
  return {
    formik,
    loading,
    handleChangePassword,
    handleChangeEmail,
    handleAccount,
    setpopupvisible,
    popupvisible,
    user,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  };
};

export default useProfileSettings;
