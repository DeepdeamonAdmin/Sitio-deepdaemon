import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadProject = async( uid ) => {

    const docRef = doc(db, 'Proyectos', uid);
    const docSnap = await getDoc(docRef);
    const p = docSnap.data();
  console.log(p)
  return p;
}
