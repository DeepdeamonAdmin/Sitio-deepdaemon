//Uso de Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from "../helpers/loadWorks";
import { types } from "../types/types";
import { uiCloseModal } from "./ui";

//Función para insertar una nueva imagen en la BD
export const startsNewImage = (formValues) => {
	return async (dispatch, getState) => {
		const { image } = getState().gallery;
		const newImage = {
			name: formValues.name,
			type: formValues.type,
			ext: formValues.ext,
			photo: image,
		}
		var collection_name = 'Gallery/'+formValues.type+'/Imagenes';
		const docRef = await addDoc(collection(db, collection_name), newImage);
		if (docRef) {
			Swal.fire('Imagen salvada', 'Éxito');

			//Envio al estado de la nueva imagen en la galería
			dispatch(addNewtoGallery(docRef.id, newImage));

			//Envio al estado del cierre del modal
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al enviar imagen');
		}
	}
}

//Publicar una nueva imagen en el estado
export const addNewtoGallery = (id, image) => ({
	type: types.galleryAddNew,
	payload: {
		id, ...image
	}
})

//función para subir el archivo a la BD
export const startUploadingImage = (file,type) => {
	return async (dispatch) => {
		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});
		const ruta = 'Gallery/'+type+'/';
		const fileUrl = await fileUpload(ruta, file);

		//envio al estado la carga de la imagen
		dispatch(loadImg(fileUrl));
		Swal.close();
	}
}

//Publicación en el estado que se ha cargado una nueva imagen
export const loadImg = (url) => ({
	type: types.galleryAddNewPhoto,
	payload: url
});

//Función para cargar la galería
export const startLoadingGallery = () => {
	return async (dispatch) => {
		var ruta = 'Gallery'
		var gallery = await loadWorks(ruta);
		for (const item of gallery) {
			ruta='Gallery/'+item.id+"/Imagenes";
			item["gallery"] = await loadWorks(ruta);
		}
		
		//Envio al estado de la galería cargada
		await dispatch( setImages( gallery ));
	}

}

//Publicación en el estado la galería cargada
export const setImages = (gallery) => ({
	type: types.galleryLoad,
	payload: gallery
});