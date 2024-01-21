import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm5nL5Cf3VCGyWNia7pEz34FSsatoPa1E",
  authDomain: "fir-l22.firebaseapp.com",
  databaseURL: "https://fir-l22-default-rtdb.firebaseio.com",
  projectId: "fir-l22",
  storageBucket: "fir-l22.appspot.com",
  messagingSenderId: "708126513103",
  appId: "1:708126513103:web:fb4a3d75c45ee6070ce4ba",
  measurementId: "G-9P47EB5KDX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export default app;
