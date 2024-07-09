// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDatFRTt-n2a8CjzkCVP_rmJzbqjXQR0So",
  authDomain: "takehome-1b767.firebaseapp.com",
  projectId: "takehome-1b767",
  storageBucket: "takehome-1b767.appspot.com",
  messagingSenderId: "1075872318886",
  appId: "1:1075872318886:web:7e10ef278ed80e1d637b67",
  measurementId: "G-HKD3H3HTW8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB=  getFirestore(FirebaseApp)