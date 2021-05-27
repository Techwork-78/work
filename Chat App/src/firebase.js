import firebase from "firebase";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC7vA-X5vzg5Fe2TlEzUKhByb56HlXtU34",
  authDomain: "tiktok-clone-13354.firebaseapp.com",
  databaseURL: "https://tiktok-clone-13354.firebaseio.com",
  projectId: "tiktok-clone-13354",
  storageBucket: "tiktok-clone-13354.appspot.com",
  messagingSenderId: "818877100537",
  appId: "1:818877100537:web:dd2671e0f8fb3398324d28",
  measurementId: "G-44WTS3700W",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(async () => {
    const token = await messaging.getToken();
    return token;
  })
  .then((token) => {
    console.log(token);
    db.collection('tokens').add({
      token: token
    })
  })
  .catch((err) => {
    console.log("Error", err);
  });

messaging.usePublicVapidKey(
  "BLbsKa5Z57VhWkZhxJmhdLFNufUyVhXfGq9gmVOibHtoMXEYnUlooA2iheqz6xerdRnGyHcgeZLlJvwbStwrdsY"
);

navigator.serviceWorker.addEventListener("message", (mes) => console.log(mes));

messaging.onMessage(() => {
  console.log("Message.....coming....");
});
export { db, auth, storage, provider, messaging };
