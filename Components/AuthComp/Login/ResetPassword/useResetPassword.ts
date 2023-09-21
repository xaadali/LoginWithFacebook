/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { Resetpassword } from "@component/services/UserSignup";
import { ResetPasswordSchema } from "@component/utills/Schema";
const UseResetPassword = (
  setActive,
  setActivePassword,
  setActiveOPT,
  setResettoggle
) => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmpass, setShowconfirmPass] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        email: values?.email,
        password: values?.password,
      };
      const response = await Resetpassword(params);
      toast.success(response?.data?.message);
      formik.resetForm();
      setLoading(false);
      setActive(false);
      setActivePassword(false);
      setResettoggle(false);
      setActiveOPT(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    formik,
    loading,
    showPass,
    setShowPass,
    showConfirmpass,
    setShowconfirmPass,
  };
};

export default UseResetPassword;
