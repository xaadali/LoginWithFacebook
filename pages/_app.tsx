import Footer from "@component/Components/__common/footer";
import NavBar from "@component/Components/__common/navBar";
import ProgressBar from "@component/Components/__common/ProgressBar";
import ScrollToTop from "@component/Components/__common/scrollToTop";
import Splash from "@component/Components/__common/SplashScreen/Splash";
import { socket, SocketContext } from "@component/context/socket";
import { updateFcmToken } from "@component/services/UserSignup";
import { addNotification } from "@component/store/reducers/notificationsSlice";
import {
  saveServiceWorker,
  saveFirebaseToken,
} from "@component/store/reducers/userReducer";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { setupAxios, setupAxiosForChat } from "@component/utills/axiosClient";
import { firebaseConfig } from "@component/utills/firebase";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { Provider } from "react-redux";
import "react-tagsinput/react-tagsinput.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store/store";
import "../styles.css";
import "../styles/Accordion.css";
import enTranslation from "../public/locales/en/translation.json";
import esTranslation from "../public/locales/es/translation.json";

interface AppType {
  Component?: any;
  pageProps?: {
    session: any;
  };
  clientId?: string;
  occupation?: string;
}
const App = (props: AppType) => {
  const location = useRouter();
  const { accessToken, serviceWorker, firbaseToken, isRead } =
    store.getState().user;
  const [serverWorkerValue, setServerWorkerValue] = useState(false);
  const [splash, setSplash] = useState(true);
  const FIREBASE_CLIENT: any =
    serverWorkerValue && initializeApp(firebaseConfig);

  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
        es: {
          translation: esTranslation,
        },
        // Add more languages as needed
      },
      fallbackLng: "es", // Default language
      debug: true,
      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });

  useEffect(() => {
    // for Service Worker //
    if ("serviceWorker" in navigator) {
      navigator?.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          setServerWorkerValue(true);
          console.log("Service worker registered:", registration);
          store.dispatch(saveServiceWorker(true));
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
          store.dispatch(saveServiceWorker(false));
        });
    }
    // Messages listener
    if (serverWorkerValue) {
      // Message Listner //
      const onMessageListener = async () => {
        const messaging: any = getMessaging(FIREBASE_CLIENT);

        // Handling incoming messages while the app is in the foreground
        onMessage(messaging, (payload) => {
          console.log(
            "🚀 ~ file: _app.tsx:77 ~ onMessage ~ messaging:",
            payload
          );
          store.dispatch(addNotification(payload));
        });

        // onBackgroundMessage(messaging, (payload) => {
        //   console.log(
        //     "[firebase-messaging-sw.js] Received background message ",
        //     payload
        //   );
        // });
      };
      // Background Message listner //
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(event, "event");
        const { type, payload } = event.data;
        if (type === "ADD_NOTIFICATION") {
          // Dispatch the addNotification action with the payload
          // dispatch(addNotification(payload));
        }
      });
      onMessageListener();
    }
  }, [serverWorkerValue, FIREBASE_CLIENT]);

  useEffect(() => {
    setupAxios();
    setupAxiosForChat();
  }, []);

  useEffect(() => {
    // for Notifications //

    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted" && accessToken && serverWorkerValue) {
          const messaging = serverWorkerValue && getMessaging(FIREBASE_CLIENT);
          const handleFcmToken = async () => {
            try {
              const res = await getToken(messaging as any, {
                vapidKey:
                  "BG9YuzTTxGm7xPuoC7fhV-pbexy2bqN3YYZBR2HaUmwUS5l7owBhnDLap5wwQnxh3cby7xGDeCBdYB3BmrJ4JRk",
              });
              store.dispatch(saveFirebaseToken(res));
              await updateFcmToken(res);
            } catch (error) { }
          };
          handleFcmToken();
          console.log("Notification permission granted.");
        } else if (permission === "denied") {
          // toast.error(
          //   "If you don't allow notifications on this website, you will not be able to log in to your account and receive no chat notifications"
          // );
        }
      });
    }
  }, [accessToken, serverWorkerValue]);

  if (splash) {
    return <Splash setSplash={setSplash} />;
  } else
    return (
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <SessionProvider session={pageProps?.session}>
            <Head>
              <title>Car Marketplace</title>
              <link rel="shortcut icon" href="/favicon.svg" />
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ScrollToTop />
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              style={{ zIndex: 9999 }}
              hideProgressBar={true}
              newestOnTop={false}
              rtl={false}
              closeOnClick={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

            {location?.asPath?.includes("authenticate") ||
              location?.asPath?.includes("dashboard") ? null : (
              <NavBar />
            )}
            <ProgressBar />
            {getLayout(<Component {...pageProps} />)}
            {location?.asPath?.includes("dashboard") ||
              location?.asPath?.includes("authenticate") ||
              location?.asPath?.includes("login") ||
              location?.asPath?.includes("signup") ||
              location?.asPath?.includes("professionals") ||
              location?.asPath?.includes("/appointment-booking") ||
              location?.asPath?.includes("/confirm-appointment") ? null : (
              <Footer />
            )}
          </SessionProvider>
        </Provider>
      </SocketContext.Provider>
    );
};

export default App;
