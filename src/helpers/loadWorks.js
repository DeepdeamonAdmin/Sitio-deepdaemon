//Uso de Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const loadWorks = async (ruta) => {
  //Array para almacenar los datos
  const works = [];

  //Construcción y ejecución de consulta
  const querySnapshot = await getDocs(collection(db, ruta));

  //Almacenamiento de datos
  querySnapshot.forEach((doc) => {
    works.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return works;
};
