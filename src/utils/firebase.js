// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBAE_API_KEY,
  authDomain: "task-manager-4362b.firebaseapp.com",
  projectId: "task-manager-4362b",
  storageBucket: "task-manager-4362b.appspot.com",
  messagingSenderId: "192670555270",
  appId: "1:192670555270:web:2e5c06e0b54421b4c58507",
  measurementId: "G-S8R2C4FN29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);