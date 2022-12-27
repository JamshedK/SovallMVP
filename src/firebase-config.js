// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCanACeDK7fsTwEPlfJDgehm9M2RFck9FA",
  authDomain: "sovall-a20af.firebaseapp.com",
  projectId: "sovall-a20af",
  storageBucket: "sovall-a20af.appspot.com",
  messagingSenderId: "207158666780",
  appId: "1:207158666780:web:50fa5ece838e256b8461d9",
  measurementId: "G-1EBYHY6YLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);