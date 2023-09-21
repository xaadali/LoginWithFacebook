import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  resetUserState,
  saveUserData,
} from "@component/store/reducers/userReducer";
import { logoutUser } from "@component/services/UserSignup";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import {
  addNewuserName,
  deleteUseraccount,
  getuserName,
} from "@component/services/AccountSettings";
import { getUsername } from "@component/store/reducers/settings";

const useAccountSettings = () => {
  const { user } = useSelector((state: any) => state?.user);
  const { userName } = useSelector((state: any) => state?.accSetting);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const location = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [popupvisible, setpopupvisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: userName ? (userName as string) : "",
    },
    validationSchema: yup.object({
      name: yup.string().max(255).required("Name is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        name: values?.name,
        email: userEmail,
      };
      const res = await addNewuserName(params);
      toast.success(res?.data?.message);
      getName(userEmail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    getName(userEmail);
  }, []);

  const handleChangePassword = () => {
    location.push("/change-password");
  };
  const handleChangeEmail = () => {
    location.push("/change-email");
  };
  const handleAccount = () => {
    setpopupvisible(!popupvisible);
  };
  const handleCancel = () => {
    formik.resetForm();
  };
  const handleDeleteaccount = async () => {
    try {
      setLoading(true);
      let params = {
        email: userEmail,
      };
      const res = await deleteUseraccount(params);
      toast.success(res?.data?.message);
      // const response = await logoutUser();
      // if (response) {
      dispatch(resetUserState());
      await signOut({
        callbackUrl: "/",
      });
      // }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
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
    handleCancel,
    handleDeleteaccount,
    userEmail,
  };
};

export default useAccountSettings;
