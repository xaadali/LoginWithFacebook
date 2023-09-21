/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { checkUserEmail, userSingUp } from "@component/services/UserSignup";
import useDebounce from "@component/utills/hooks/useDebounce";
import { SSOType } from "@component/utills/enum";
import { LanguagesEnum } from "@component/utills/languages";

const useSignUp = () => {
  const [checkEmail, setCheckEmail] = useState("");
  const [isCorrectEmail, setIsCorrectEmail] = useState<any>(null);
  const debouncedValue = useDebounce<string>(checkEmail, 1000);
  const location = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showRepPass, setShowRepPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
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
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  // Create a user name using email //

  const getUserdefaultName = (email) => {
    let match: any = String(email).match(/([^@]+)@/);
    const nameWithoutDot = match[1].replace(/\./g, " ");
    return nameWithoutDot;
  };

  // Sign Up user function //

  const handleSubmit = async (values: any) => {
    if (!isCorrectEmail) {
      toast.error("Email already exist");
    }

    try {
      setLoading(true);
      let params = {
        email: values.email,
        password: values.password,
        loginAs: "normal",
        type: SSOType.User,
        fullName: getUserdefaultName(values.email),
      };
      const res = await userSingUp(params);
      toast.success(res?.data?.message);
      location.push("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message[0]);
    }
  };

  const navigateToLogin = () => {
    location.push("/login");
  };
  const handleCheckEmail = async () => {
    try {
      const params = {
        email: checkEmail,
      };
      const response = await checkUserEmail(params);
      setIsCorrectEmail(response?.data);
    } catch (error) {
      setIsCorrectEmail(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (checkEmail) handleCheckEmail();
  }, [debouncedValue]);

  useEffect(() => {
    setCheckEmail(formik.values.email);
  }, [formik.values.email]);

  return {
    showPass,
    setShowPass,
    setShowRepPass,
    showRepPass,
    formik,
    loading,
    navigateToLogin,
    isCorrectEmail,
  };
};

export default useSignUp;
