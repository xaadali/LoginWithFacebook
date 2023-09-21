import axios, { AxiosInstance } from "axios";
import { store } from "../store/store";
import defaultConfig from "./config";
import { chatConfig } from "./config";
import { LanguagesEnum } from "./languages";

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: defaultConfig.Base_URL,
});

export const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      config.headers.lang = LanguagesEnum.English;
      const authToken = store.getState()?.user?.accessToken;
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (err: any) => { 
      Promise.reject(err);
    }
  );
};

export const HTTP_CLIENT_FOR_CHAT: AxiosInstance = axios.create({
  baseURL: chatConfig.Base_URL,
});

export const setupAxiosForChat = () => {
  HTTP_CLIENT_FOR_CHAT.interceptors.request.use(
    (config: any) => {
      config.headers.lang = LanguagesEnum.English;
      const authToken = store.getState()?.user?.accessToken;

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (err: any) => {
      Promise.reject(err);
    }
  );
};
