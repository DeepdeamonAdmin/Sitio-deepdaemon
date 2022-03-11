import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCcVVoRrAapdSBVJ82PG8bO4Yg7JfWrDYQ",
  authDomain: "authdeepdemoon.firebaseapp.com",
  projectId: "authdeepdemoon",
  storageBucket: "authdeepdemoon.appspot.com",
  messagingSenderId: "312138558549",
  appId: "1:312138558549:web:cc25511e3e983531de38dc"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}