import Swal from 'sweetalert2';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { uiCloseModal } from './ui';
//import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

export const startNewTesis = (formValues) => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		//const { img } = getState().projects;

		const newTesis= {
			name: formValues.name,
			correo: formValues.correo,
			descripcion: formValues.descripcion,
			results: formValues.results,
			urlImg: formValues.urlImg,
			nameTech: formValues.nameTech,
			estado: formValues.estado,
			display: formValues.display,
			url: formValues.url,
			publisher: formValues.publisher
		}
		// const newTesisInd = {
		// 	name: formValues.name,
		// }
		const docRef1 = await addDoc(collection(db, "Tesis"), newTesis);
		//const docRef2 = await addDoc(collection(db, `Usuarios/${uid}/Tesis`), newTesisInd);
		
		if (docRef1) {
			Swal.fire('Tesis agregada', formValues.name,'success');
			//dispatch(activeProject(docRef1.id, newProject));
			//dispatch(addNewProject(docRef1.id, newProject));
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al agregar el proyecto');
		}
	}
}

