import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadAllUsers = async(ruta) => {

    const usuarios = [];

    const querySnapshot = await getDocs(collection(db, ruta));
    querySnapshot.forEach((doc) => {
        usuarios.push({
            id: doc.id,
            ...doc.data()
        })
      });
  return usuarios;
}


