// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnPG5NIwQ3PYq2Lm_AcQD88BMr6bXrG14",
  authDomain: "covalto-4d13d.firebaseapp.com",
  projectId: "covalto-4d13d",
  storageBucket: "covalto-4d13d.appspot.com",
  messagingSenderId: "1031204317381",
  appId: "1:1031204317381:web:2f90bd31e7663ea0d728ac",
  measurementId: "G-B0B1FZC3J9"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB=  getFirestore(FirebaseApp)