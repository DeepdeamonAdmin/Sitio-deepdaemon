import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadWorks } from '../helpers/loadWorks';

export const startsNewYoutube = (formValues) =>{
    return async (dispatch) => {
		const newInst = {
			urlVideo: formValues.urlVideo,
            title: formValues.title,
		}
        const newYoutube = await addDoc(collection(db, 'Youtube'), newInst)
		if(newYoutube) {
			Swal.fire('Video guardado con éxito', 'Éxito');
        	dispatch(youtubeAddNew(newYoutube.id, newInst));
		} else {
			Swal.fire('Error al agrega la tecnología', 'error')
		}
	}
}
export const youtubeAddNew = (id, inst) => ({
	type: types.youtubeAddNew,
	payload: {
		id, ...inst
	}
})
export const startLoadingYoutube = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const ruta = "Youtube";
		const youtubes = await loadWorks(ruta);
		dispatch(setYoutubes(youtubes));
	}
}

export const setYoutubes = (youtubes) => ({
	type: types.youtubeLoad,
	payload: youtubes
});