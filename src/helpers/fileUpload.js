//Uso de Firestore
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const fileUpload = async( ruta, file ) => {

    //Obtención del storage
    const storage = getStorage();
    const storageRef = ref(storage, `${ruta}${file.name}`);

    //Función de subida de archivo
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    //URL del archivo subido
    const urlRef = await getDownloadURL(storageRef);
    
    return urlRef;
}
