import 'firebase/firestore';
import 'firebase/auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
 
//Constantes
const firebaseConfig = {
  apiKey: "AIzaSyCUkR89_gPOF-uSi5OZFmyp6fvq9QYGQTc",
  authDomain: "deepdaemon-bf419.firebaseapp.com",
  projectId: "deepdaemon-bf419",
  storageBucket: "deepdaemon-bf419.appspot.com",
  messagingSenderId: "268695268803",
  appId: "1:268695268803:web:37fca7e8d3142a7f712176",
  measurementId: "G-STVJ91NMJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app)
 
const db = getFirestore(app);
 
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}