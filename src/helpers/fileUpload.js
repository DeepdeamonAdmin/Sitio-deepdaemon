import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const fileUpload = async( ruta, file ) => {

    const storage = getStorage();

    const storageRef = ref(storage, `${ruta}${file.name}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

    //obtenemos la url de la imagen cargada
    const urlRef = await getDownloadURL(storageRef);
    
    return urlRef;
}
