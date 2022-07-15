import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadAvisos = async( uid ) => {

    const docRef = doc(db, 'Avisos', uid);
    const docSnap = await getDoc(docRef);
    const aviso = docSnap.data();
  
  return aviso;
  }
  