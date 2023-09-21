/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../styles/authenticate.module.scss";
import {
  getCurrentUserIP,
  loginWithGoogle,
  verifyWithGoogle,
} from "@component/services/UserSignup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAccessToken,
  saveFirebaseToken,
  saveUserData,
  saveUserType,
} from "@component/store/reducers/userReducer";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getDaysDifferece } from "@component/utills/dates";
import { loginWithFacebook } from "@component/services/UserSignup";
import { generateRandomIp, SSOType } from "@component/utills/enum";
import { LanguagesEnum } from "@component/utills/languages";
import { firebaseConfig } from "@component/utills/firebase";
import { store } from "@component/store/store";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const AuthenticateCompo = () => {
  const LoginAs = useSelector((state: any) => state?.user?.LoginAs);
  const { user, serviceWorker } = useSelector((state: any) => state?.user);
  const FIREBASE_CLIENT = serviceWorker && initializeApp(firebaseConfig);
  const messaging = serviceWorker && getMessaging(FIREBASE_CLIENT);
  const location = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleFetchData = async () => {
    const session = await getSession();
    const timeStampResponse = getDaysDifferece(
      session ? session.expires : new Date()
    );
    if (!timeStampResponse) {
      location.push("/login");
      return;
    }
    try {
      setLoading(true);
      const notificationRes = await Notification.requestPermission();

      // firbaase token //
      const firbaseToken =
        notificationRes !== "denied" &&
        (await getToken(messaging, {
          vapidKey:
            "BG9YuzTTxGm7xPuoC7fhV-pbexy2bqN3YYZBR2HaUmwUS5l7owBhnDLap5wwQnxh3cby7xGDeCBdYB3BmrJ4JRk",
        }));
      store.dispatch(saveFirebaseToken(firbaseToken));

      // google and facebook auth //

      const RandomIp = generateRandomIp();
      const params = {
        email: session?.user?.email,
        fullName: session?.user?.name,
        imageUrl: session?.user?.image,
        accessToken: firbaseToken,
        ipAddress: RandomIp,
        type: SSOType.User,
      };
      let response;
      if (LoginAs === "google") {
        response = await loginWithGoogle(params);
      } else if (LoginAs === "facebook") {
        response = await loginWithFacebook(params);
        console.log(
          "🚀 ~ file: authenticate.tsx:76 ~ handleFetchData ~ response:",
          response
        );
      }
      if (response?.data) {
        dispatch(saveUserData(response?.data?.data?.user));
        dispatch(saveAccessToken(response?.data?.data?.access_token));
        await signIn("credentials", {
          redirect: false,
          token: response?.data?.data?.access_token,
        });
        location.push("/dashboard");
        toast.success(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      location.push("/login");
      toast.error(error?.response?.data?.message[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // setProfile(data)
    handleFetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src={"/icons/logo.svg"} alt="" style={{ cursor: "pointer" }} />
          </div>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticateCompo;
