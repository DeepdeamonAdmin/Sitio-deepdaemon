import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUkR89_gPOF-uSi5OZFmyp6fvq9QYGQTc",
  authDomain: "deepdaemon-bf419.firebaseapp.com",
  projectId: "deepdaemon-bf419",
  storageBucket: "deepdaemon-bf419.appspot.com",
  messagingSenderId: "268695268803",
  appId: "1:268695268803:web:37fca7e8d3142a7f712176",
  measurementId: "G-STVJ91NMJ5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}