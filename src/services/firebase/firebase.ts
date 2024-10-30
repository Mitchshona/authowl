// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAu1ouAu0TVSpUZmJqF2EZOneICLqxl_rk",

  authDomain: "owlthai.firebaseapp.com",

  projectId: "owlthai",

  storageBucket: "owlthai.appspot.com",

  messagingSenderId: "928164941666",

  appId: "1:928164941666:web:71aee4f71667486ad0e63b",

  measurementId: "G-QXCTXB11M7",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
