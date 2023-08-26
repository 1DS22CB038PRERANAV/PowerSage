// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfvvGVoC1bxX8VEAM8tMsUEXqxK1ws8I4",
  authDomain: "power-sage.firebaseapp.com",
  projectId: "power-sage",
  storageBucket: "power-sage.appspot.com",
  messagingSenderId: "580119126308",
  appId: "1:580119126308:web:9a3e3c6467509294e513b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
