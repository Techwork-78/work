import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByKTillEXWTMFSUK91gk3rKNus4-UqbLQ",
  authDomain: "netflix-api-454d5.firebaseapp.com",
  databaseURL: "https://netflix-api-454d5.firebaseio.com",
  projectId: "netflix-api-454d5",
  storageBucket: "netflix-api-454d5.appspot.com",
  messagingSenderId: "482505407940",
  appId: "1:482505407940:web:a2d848950d9757c514b891",
  measurementId: "G-53HKTT0HV5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
