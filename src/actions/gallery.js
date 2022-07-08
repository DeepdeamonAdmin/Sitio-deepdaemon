import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { types } from "../types/types";
import { uiCloseModal } from "./ui";


export const startsNewImage = (formValues) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { img } = getState().gallery;

		const newImage = {
			name: formValues.name,
			photo: img,
		}

		const docRef = await addDoc(collection(db, `Gallery/${uid}/Imagenes`), newImage);

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

export const startUploadingImage = (file) => {
	return async (dispatch) => {

		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const ruta = ''
		const fileUrl = await fileUpload(ruta, file);
		dispatch(loadImg(fileUrl));
		Swal.close();
	}
}

export const loadImg = (url) => ({
	type: types.galleryAddNewPhoto,
	payload: url
});

