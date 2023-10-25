import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ7mkw5CwzhvA3tL3xJNZVX-Zg-NqIDsg",
  authDomain: "apphanhchinh.firebaseapp.com",
  projectId: "apphanhchinh",
  storageBucket: "apphanhchinh.appspot.com",
  messagingSenderId: "307189795157",
  appId: "1:307189795157:web:b731dbe470ca4ea2dd87dc",
  measurementId: "G-C6788KTV83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
