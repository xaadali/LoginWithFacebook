import { HTTP_CLIENT } from "@component/utills/axiosClient";
import { encrypt } from "@component/utills/cipher-text";
import defaultConfig from "@component/utills/config";
import { LanguagesEnum } from "@component/utills/languages";
import axios from "axios";

export const userSingUp = async (data: object) => {
  return await HTTP_CLIENT.post("/user/signup", data);
};

export const userLogin = async (data: object) => {
  return await HTTP_CLIENT.post("/auth/login", data);
};
export const updateFcmToken = async (token: string) => {
  return await HTTP_CLIENT.patch(`/user/fcm-token?fcmToken=${token}`);
};

export const getCurrentUserIP = async () => {
  return await axios.get("https://api.ipify.org/?format=json");
};

export const resendEmail = async (data: object) => {
  return await HTTP_CLIENT.post("/auth/forgot-password", data);
};
export const verifyOPTcode = async (data: object) => {
  return await HTTP_CLIENT.post("/auth/verify-otp", data);
};
export const Resetpassword = async (data: object) => {
  return await HTTP_CLIENT.post("/auth/reset-password", data);
};

export const logoutUser = async () => {
  return await HTTP_CLIENT.post("/auth/logout");
};

export const checkUserEmail = async (data: object) => {
  return await HTTP_CLIENT.post("/user/check-user", data);
};

export const loginWithGoogle = async (params: object) => {
  const getApiKey = process.env.NEXT_PUBLIC_API_KEY;
  const encryptedAPIKey = await encrypt(getApiKey);
  const config = {
    method: "post",
    lang: LanguagesEnum.English,
    url: `${defaultConfig.Base_URL}auth/google`,
    headers: {
      "x-api-key": encryptedAPIKey,
    },
    data: params,
  };
  const response = await axios(config);
  return response;
};

export const loginWithFacebook = async (params: object) => {
  const getApiKey = process.env.NEXT_PUBLIC_API_KEY;
  const encryptedAPIKey = await encrypt(getApiKey);
  const config = {
    method: "post",
    lang: LanguagesEnum.English,
    url: `${defaultConfig.Base_URL}auth/facebook`,
    headers: {
      "x-api-key": encryptedAPIKey,
    },
    data: params,
  };
  const response = await axios(config);
  return response;
};

export const verifyWithGoogle = async (token: string) => {
  return await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
  );
};
