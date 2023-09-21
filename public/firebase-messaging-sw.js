importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Handle background message and show notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
  self.clients.matchAll().then((clients) => {
    if (clients && clients.length) {
      clients[0].postMessage({
        type: "ADD_NOTIFICATION",
        payload,
      });
    }
  });
});
