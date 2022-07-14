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

export const startLoadingGalleryAll = () => {
	return async (dispatch) => {
		console.log('entra');
		const ruta = 'Gallery'
		const gallery = await loadAllWorks(ruta)
		console.log(gallery);
		if (gallery) {
			dispatch(setAllGallery(gallery))
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

export const setAllGallery = (gallery) => ({
	type: types.galleryAllLoad,
	payload: gallery
});

// export const startLoadingGallery = () => {
// 	return async (dispatch, getState) => {
// 		const { uid } = getState().auth
// 		const ruta = `Gallery${uid}/Imagenes`
// 		const imagenes = await loadWorks(ruta)
// 		if (imagenes) {
// 			dispatch(setAllImages(imagenes))
// 		} else {
// 			Swal.fire('Error BD no identificada');
// 		}
// 	}

// }

// export const setAllImages = (imagenes) => ({
// 	type: types.galleryAllLoad,
// 	payload: imagenes
// });