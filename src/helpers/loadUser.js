import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadUser = async( uid ) => {

    const docRef = doc(db, 'Usuarios', uid);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();

  return user;
}
