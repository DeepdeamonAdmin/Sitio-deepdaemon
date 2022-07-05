import { doc, setDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { types } from "../types/types";
import { uiCloseModal } from "./ui";

export const startUploadingImage = (file) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});
		const name = `${uid}` + file.name
		const photo = await fileUpload(name, file);
		const data = { name, photo }
		dispatch(startSaveData(data));
		Swal.close();
	}
}


export const startSaveData = (data) => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;

		const dataToFirestore = { ...data };

		await updateDoc(doc(db, 'Gallery', uid), dataToFirestore);

		dispatch(
			refreshData(dataToFirestore),
			uiCloseModal()
		);
		Swal.fire('Saved Image:', data.name, 'success');
	}
}

const refreshData = (data) => ({
	type: types.galleryLoad,
	payload: { ...data }
})