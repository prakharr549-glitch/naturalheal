// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8CNlBTGfs1enf-yQqZ2JZBsEeV7wSdds",
  authDomain: "studio-3115413588-f09cf.firebaseapp.com",
  projectId: "studio-3115413588-f09cf",
  storageBucket: "studio-3115413588-f09cf.appspot.com",
  messagingSenderId: "107287017399",
  appId: "1:107287017399:web:bd69be28e499694138da32",
  measurementId: "G-1CDHVE99DC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, analytics };
