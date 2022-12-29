import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'



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

// Initialize db
export const db = getFirestore();
