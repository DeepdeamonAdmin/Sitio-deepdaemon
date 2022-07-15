import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from "../helpers/loadWorks";
import { types } from "../types/types";
import { uiCloseModal } from "./ui";

// import { fileUpload } from '../helpers/fileUpload';
import { loadAllUsers } from '../helpers/loadAllUsers';


export const startsNewImage = (formValues) => {
	return async (dispatch, getState) => {
		const { img } = getState().gallery;

		const newImage = {
			name: formValues.name,
			desc: formValues.desc,

			photo: img,
		}

		const docRef = await addDoc(collection(db, `Avisos/`), newImage);

		if (docRef) {
			Swal.fire('Aviso guardado', 'Éxito');
			dispatch(addNewtoGallery(docRef.id, newImage));
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al enviar el aviso');
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


export const startLoadingGallery = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth
		const ruta = `Gallery${uid}/Imagenes`
		const imagenes = await loadWorks(ruta)
		if (imagenes) {
			dispatch(setAllImages(imagenes))
		} else {
			Swal.fire('Error BD no identificada');
		}
	}

}

export const setAllImages = (imagenes) => ({
	type: types.galleryAllLoad,
	payload: imagenes
});

//Obtener todos los uasuarios 
export const startLoadinUsersAll = () => {
	return async (dispatch) => {
		const ruta = '/Avisos'
		const avisos = await loadAllUsers(ruta);
		//verificamos que obtenimos el documento 
		if (avisos) {
			dispatch(setUsers(avisos));
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

//mandar a redux los usuarios
export const setUsers = (avisos) => ({
	type: types.usersLoad,
	payload: avisos
});

