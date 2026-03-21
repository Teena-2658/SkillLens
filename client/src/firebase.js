// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1URUkuJaoTNY-Z7yn6U1WK4DloKbhBv4",
  authDomain: "skilllens-c80b6.firebaseapp.com",
  projectId: "skilllens-c80b6",
  storageBucket: "skilllens-c80b6.firebasestorage.app",
  messagingSenderId: "81817060169",
  appId: "1:81817060169:web:f3de757082e9d3898a1098",
  measurementId: "G-ND2LN41L5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();