import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadAllWorks } from "../helpers/loadAllWorks";
import { loadWorks } from "../helpers/loadWorks";
import { types } from "../types/types";
import { uiCloseModal } from "./ui";


export const startsNewImage = (formValues) => {
	return async (dispatch, getState) => {
		//const { uid } = getState().auth;
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
			dispatch(addNewtoGallery(docRef.id, newImage));
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al enviar imagen');
		}
	}
}

export const addNewtoGallery = (id, image) => ({
	type: types.galleryAddNew,
	payload: {
		id, ...image
	}
})

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
		dispatch(loadImg(fileUrl));
		Swal.close();
	}
}

export const loadImg = (url) => ({
	type: types.galleryAddNewPhoto,
	payload: url
});

export const startLoadingGallery = () => {
	return async (dispatch, getState) => {
		var ruta = 'Gallery'
		var gallery = await loadWorks(ruta);
		console.log(gallery);
		for (const item of gallery) {
			ruta='Gallery/'+item.id+"/Imagenes";
			item["gallery"] = await loadWorks(ruta);
		}
		await dispatch( setImages( gallery ));
	}

}

export const setImages = (gallery) => ({
	type: types.galleryLoad,
	payload: gallery
});