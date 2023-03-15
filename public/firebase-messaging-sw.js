importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCvg2hs_OBGALO3daVcKdVbJJYnbqm_5XU",
  authDomain: "react-post-de8f7.firebaseapp.com",
  databaseURL: "https://react-post-de8f7-default-rtdb.firebaseio.com",
  projectId: "react-post-de8f7",
  storageBucket: "react-post-de8f7.appspot.com",
  messagingSenderId: "915123736953",
  appId: "1:915123736953:web:748b05a226372a7de71fa8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const { title, body } = payload.notification;

  const options = {
    body,
    icon: "/favicon/facivon-96x96.png",
    badge: "/favicon/facivon-96x96.png",
    vibrate: [300, 100, 300],
    tag: "BusStopWatch",
  };

  return self.registration.showNotification(title, options);
});
