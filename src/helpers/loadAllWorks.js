import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadAllWorks = async(ruta) => {

    const works = [];

    const asistencias = query(collectionGroup(db, ruta) )
    const querySnapshot = await getDocs(asistencias);
    
    querySnapshot.forEach((doc) => {      
        works.push({
            id: doc.id,
            ...doc.data()
        })
      });
  return works;
}


