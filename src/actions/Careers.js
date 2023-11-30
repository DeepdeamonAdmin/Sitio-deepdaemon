import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startsNewCareer = (formValues) => {
	return async (dispatch) => {
		const newInst = {
			nombre: formValues.name,
		}
        await setDoc(doc(db, 'Carrera', formValues.name), {
			'nombre': formValues.name
		})
		Swal.fire('Carrera guardada', 'Éxito');
        dispatch(addNewCareer(formValues.name, newInst));
	}
}

export const addNewCareer = (id, inst) => ({
	type: types.addNewCareer,
	payload: {
		id, ...inst
	}
})


export const setAllcareers = (career) => ({
	type: types.institucionAllLoad,
	payload: career
});