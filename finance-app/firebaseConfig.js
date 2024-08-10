// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAifMaHaoRTZ7VEA0D1PAjOoYBG6lZqQb0",
  authDomain: "finance-app-72245.firebaseapp.com",
  projectId: "finance-app-72245",
  storageBucket: "finance-app-72245.appspot.com",
  messagingSenderId: "825553197875",
  appId: "1:825553197875:web:d9f0f90c32f4ebe1f27c46",
  measurementId: "G-Q79XXV8NLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);