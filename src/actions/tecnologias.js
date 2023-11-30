import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startsNewTech = (formValues) => {
	return async (dispatch) => {
		const newInst = {
			nombre: formValues.name,
		}
        const newTech = await addDoc(collection(db, 'Tecnologias'), newInst)
		if(newTech) {
			Swal.fire('Tecnología guardada con éxito', 'Éxito');
        	dispatch(addNewTech(formValues.name, newInst));
		} else {
			Swal.fire('Error al agrega la tecnología', 'error')
		}
	}
}

export const addNewTech = (id, inst) => ({
	type: types.techAddNew,
	payload: {
		id, ...inst
	}
})

export const setAlltechs = (tech) => ({
	type: types.institucionAllLoad,
	payload: tech
});