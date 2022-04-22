import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadWorks = async( ruta ) => {

    const works = [];

    const querySnapshot = await getDocs(collection(db, ruta));
    querySnapshot.forEach((doc) => {
        works.push({
            id: doc.id,
            ...doc.data()
        })
      });
  return works;
}
