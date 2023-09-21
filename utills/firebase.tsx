import { saveFirebaseToken } from "@component/store/reducers/userReducer";
import { store } from "@component/store/store";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB2f9VmdQjQXbdbkIIJrFtbDJiWa0IDSD4",
  authDomain: "carmaketplace.firebaseapp.com",
  databaseURL: "https://carmaketplace-default-rtdb.firebaseio.com",
  projectId: "carmaketplace",
  storageBucket: "carmaketplace.appspot.com",
  messagingSenderId: "842068121758",
  appId: "1:842068121758:web:c41c716fae43354a5a438f",
  measurementId: "G-1Z1H84XXVG",
};

const { serviceWorker } = store.getState().user;

const FIREBASE_CLIENT = initializeApp(firebaseConfig);
let messaging: any = "";

if (typeof window !== "undefined") {
  // If you're facing any type of error remove serverWorker on production //
  messaging = serviceWorker && getMessaging(FIREBASE_CLIENT);
}

export const getTokenFirebase = (setTokenFound) => {
  if (typeof window === "undefined") {
    return;
  }

  return getToken(messaging, {
    vapidKey:
      "BG9YuzTTxGm7xPuoC7fhV-pbexy2bqN3YYZBR2HaUmwUS5l7owBhnDLap5wwQnxh3cby7xGDeCBdYB3BmrJ4JRk",
  })
    .then((currentToken) => {
      console.log("Current Token:", currentToken);
      if (currentToken) {
        setTokenFound(currentToken);
        store.dispatch(saveFirebaseToken(currentToken));
      } else {
        setTokenFound(currentToken);
      }
    })
    .catch((err) => {
      // Handle error while creating client token
    });
};

export { firebaseConfig, messaging };
