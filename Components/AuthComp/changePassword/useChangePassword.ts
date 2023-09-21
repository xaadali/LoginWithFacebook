import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "@component/store/reducers/userReducer";
import { signOut } from "next-auth/react";
import { handleChangePassword } from "@component/services/AccountSettings";
import { logoutUser } from "@component/services/UserSignup";

const UseChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [showOldpass, setShowoldPass] = useState<boolean>(false);
  const [showNewpass, setShownewPass] = useState<boolean>(false);
  const [showConfirmpass, setShowconfirmPass] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      oldPassword: yup
        .string()
        .max(255)
        .required("Old password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      password: yup
        .string()
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });
  const handleSubmit = async (values: any, { resetForm }) => {
    try {
      setLoading(true);
      let params = {
        email: userEmail,
        password: values?.oldPassword,
        newPassword: values?.password,
      };
      const res = await handleChangePassword(params);
      toast.success(res?.data?.message);
      setLoading(false);
      resetForm();
      const response = await logoutUser();
      if (response) {
        await signOut({
          callbackUrl: "/",
        });
        dispatch(resetUserState());
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleBackscreen = () => {
    router.back();
  };
  return {
    formik,
    handleBackscreen,
    loading,
    setShowoldPass,
    showOldpass,
    setShownewPass,
    showNewpass,
    setShowconfirmPass,
    showConfirmpass,
  };
};

export default UseChangePassword;
