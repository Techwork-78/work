import firebase from "firebase";

importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js");

const config = {
  messagingSenderId: "818877100537",
};

firebase.initializeApp(config);

const self = this;

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message from html";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/la5.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
