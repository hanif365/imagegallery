import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM3etKVR28yv7uuhWX2KfJaBmWMXCR2EE",
  authDomain: "myimagegallery1.firebaseapp.com",
  projectId: "myimagegallery1",
  storageBucket: "myimagegallery1.appspot.com",
  messagingSenderId: "134151180045",
  appId: "1:134151180045:web:afb40f02bb26e88787ea44",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
