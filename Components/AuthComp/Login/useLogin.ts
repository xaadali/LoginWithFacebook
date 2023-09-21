/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProviders, signIn, useSession } from "next-auth/react";
import {
  getCurrentUserIP,
  resendEmail,
  userLogin,
  verifyOPTcode,
} from "@component/services/UserSignup";
import {
  saveAccessToken,
  saveFirebaseToken,
  saveUserData,
  saveUserType,
} from "@component/store/reducers/userReducer";
import modifyError from "@component/helper";
import { generateRandomIp, SSOType } from "@component/utills/enum";
import { LoginSchema } from "@component/utills/Schema";
import { firebaseConfig } from "@component/utills/firebase";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { store } from "@component/store/store";
import { GetBrowserInfo } from "@component/services/browserServices";
import { useTranslation } from "react-i18next";
const UseLogin = () => {
  const { t, i18n } = useTranslation();
  const { status, data } = useSession();
  const { user, serviceWorker } = useSelector((state: any) => state?.user);
  const FIREBASE_CLIENT = serviceWorker && initializeApp(firebaseConfig);
  const messaging = serviceWorker && getMessaging(FIREBASE_CLIENT);
  const dispatch = useDispatch();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [resendEmailInfo, setResendEmailInfo] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [activePassword, setActivePassword] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [activeOPT, setActiveOPT] = useState<boolean>(false);
  const [resetToggle, setResettoggle] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [firbaseToken, setFirbaseToken]: any = useState();

  const handleSocialLogin = async (status) => {
    const response = await getProviders();
    console.log(
      "🚀 ~ file: useLogin.ts:51 ~ handleSocialLogin ~ response:",
      response
    );

    if (status === "google") {
      dispatch(saveUserType("google"));
      await signIn(response?.google?.id, {
        callbackUrl: "/authenticate",
      });
    } else if (status === "facebook") {
      dispatch(saveUserType("facebook"));
      const res = await signIn(response?.facebook?.id, {
        callbackUrl: "/authenticate",
      });
      console.log("🚀 ~ file: useLogin.ts:63 ~ handleSocialLogin ~ res:", res);
    }
  };
  const formikSchema = yup.object({
    email: yup
      .string()
      .email("Email is not valid")
      .matches(/@[^.]*\./, "Email is not valid")
      .required("Email is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formikSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    // debugger;
    try {
      const browser = GetBrowserInfo();
      console.log("browser", browser);
      const notificationPermission = await Notification.requestPermission();
      console.log(
        "🚀 ~ file: useLogin.ts:76 ~ handleSubmit ~ notificationRes:",
        notificationPermission
      );
      setLoading(true);

      // firbaase token //
      const firbaseToken =
        notificationPermission === "granted" &&
        serviceWorker === true &&
        browser !== "Safari"
          ? await getToken(messaging, {
              vapidKey:
                "BG9YuzTTxGm7xPuoC7fhV-pbexy2bqN3YYZBR2HaUmwUS5l7owBhnDLap5wwQnxh3cby7xGDeCBdYB3BmrJ4JRk",
            })
          : "";
      store.dispatch(saveFirebaseToken(firbaseToken));

      const RandomIp = generateRandomIp();

      let params = {
        email: values?.email,
        password: values?.password,
        ipAddress: RandomIp,
        type: SSOType.User,
        fcmToken: firbaseToken,
      };

      // user Login //
      const response = await userLogin(params);
      dispatch(saveAccessToken(response?.data?.data?.access_token));
      dispatch(saveUserData(response?.data));

      // jwt token check //

      await signIn("credentials", {
        token: response?.data?.data?.access_token,
        redirect: false,
      });
      if (response?.data?.data?.user?.userType === "user") {
        location.push("/");
      } else {
        location.push("/dashboard/workshop");
      }
      toast.success(t("toastMessages.login"));
    } catch (error) {
      console.log("🚀 ~ file: useLogin.ts:122 ~ handleSubmit ~ error:", error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const navigateToSignUp = () => {
    location.push("/signup");
  };

  const handleSubmitEmail = async () => {
    if (!resendEmailInfo) {
      toast.error("Please enter email first!");
      return;
    }
    try {
      setResendLoading(true);
      const params = {
        email: resendEmailInfo,
      };
      const response = await resendEmail(params);
      setActive(false);
      setActiveOPT(true);
      toast.success(response?.data?.message);
      setResendLoading(false);
    } catch (error) {
      modifyError(error);
      setResendLoading(false);
    }
  };
  const navigateToLogin = () => {
    setActivePassword(false);
    setActive(false);
    setActiveOPT(false);
  };
  const handleSubmitOTP = async () => {
    try {
      setResendLoading(true);
      let params = {
        email: resendEmailInfo,
        otp: Number(otp),
      };
      const res = await verifyOPTcode(params);
      toast.success(res?.data?.message);
      setResendLoading(false);
      setResettoggle(true);
    } catch (error) {
      setResendLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const recieveOTP = (value: string) => {
    setOtp(value);
  };

  return {
    formik,
    loading,
    navigateToSignUp,
    handleSocialLogin,
    resendLoading,
    active,
    setActive,
    setResendEmailInfo,
    resendEmailInfo,
    handleSubmitEmail,
    showPass,
    setShowPass,
    setActivePassword,
    activePassword,
    navigateToLogin,
    setActiveOPT,
    activeOPT,
    handleSubmitOTP,
    recieveOTP,
    resetToggle,
    setResettoggle,
  };
};

export default UseLogin;
