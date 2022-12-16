import Swal from 'sweetalert2';
import { addDoc, collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { uiCloseModal } from './ui';
import { types } from '../types/types';
import { loadWorks } from '../helpers/loadWorks';
import { loadAllWorks } from '../helpers/loadAllWorks';
//import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

export const startNewTesis = (formValues) => {
	return async (dispatch, getState) => {
		const projectsRef = collection(db, "Tesis");
		const q = query(projectsRef, where("name", "==", formValues.name));
		const Data = await getDocs(q);

		if (Data.docs.length == 0) {
			const { uid } = getState().auth;
			//const { img } = getState().projects;

			const newTesis = {
				name: formValues.name,
				correo: formValues.correo,
				descripcion: formValues.descripcion,
				results: formValues.results,
				urlImg: formValues.urlImg,
				nameTech: formValues.nameTech,
				estado: formValues.estado,
				display: formValues.display,
				url: formValues.url,
				publisher: formValues.publisher,
				autores: formValues.autores
			}
			// const newTesisInd = {
			// 	name: formValues.name,
			// }
			const docRef1 = await addDoc(collection(db, "Tesis"), newTesis);

			if (docRef1) {
				Swal.fire('Tesis agregada', formValues.name, 'success');
				dispatch(activeTesis(docRef1.id, newTesis));
				dispatch(addNewTesis(docRef1.id, newTesis));
				dispatch(uiCloseModal())
			} else {
				Swal.fire('Error al agregar tesis');
			}
		} else {
			Swal.fire('Error, la tesis que deseas agregar ya está registrada');
		}
	}
}

export const activeTesis = (id, tesis) => ({
	type: types.tesisActive,
	payload: {
		id,
		...tesis
	}
});

export const addNewTesis = (id, tesis) => ({
	type: types.tesisAddNew,
	payload: {
		id, ...tesis
	}
})

export const startLoadingTesis = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const ruta = "Tesis";
		const tesis = await loadWorks(ruta);
		dispatch(setTesis(tesis));

	}
}

export const setTesis = (tesis) => ({
	type: types.tesisLoad,
	payload: tesis
});

export const startLoadinTesisAll = () => {
	return async (dispatch) => {
		const ruta = 'Tesis'
		const tesis = await loadAllWorks(ruta);
		if (tesis) {
			dispatch(setAllTesis(tesis));
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

export const setAllTesis = (tesis) => ({
	type: types.tesisAllLoad,
	payload: tesis
});