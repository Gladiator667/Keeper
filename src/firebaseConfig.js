import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyBTCrAE8DnCfZhXG4PTbTZQraucOqogAOA",
  authDomain: "auth-development-a9794.firebaseapp.com",
  projectId: "auth-development-a9794",
  storageBucket: "auth-development-a9794.appspot.com",
  messagingSenderId: "182873438014",
  appId: "1:182873438014:web:326f6b0d55667be5d39e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;