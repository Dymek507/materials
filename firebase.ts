import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbWQm7LB6gX4qa8_XVjBgNp-Na5PJZ7wQ",

  authDomain: "materials-cf7f2.firebaseapp.com",

  projectId: "materials-cf7f2",

  storageBucket: "materials-cf7f2.appspot.com",

  messagingSenderId: "1072742507099",

  appId: "1:1072742507099:web:b0ae0fa409ee37d406d57e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
