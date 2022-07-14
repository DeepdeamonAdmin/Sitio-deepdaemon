import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadAllWorks } from "../helpers/loadAllWorks";
import { types } from "../types/types";

export const startsNewInstitution = (formValues) => {
	return async (dispatch) => {
		const newInst = {
			name: formValues.name,
			shortName: formValues.shortName
		}
		await setDoc(doc(db, 'Escuela', formValues.shortName), {
			'name': formValues.name,
			'shortName': formValues.shortName
		})
		Swal.fire('Institución salvada', 'Éxito');
		dispatch(addNewInstitution(formValues.shortName, newInst));
	}
}

export const addNewInstitution = (id, inst) => ({
	type: types.addNewInstitution,
	payload: {
		id, ...inst
	}
})


export const startLoadingInstitutionsAll = () => {
	console.log('entra');
	return async (dispatch) => {
		const ruta = 'Escuela'
		const institutions = await loadAllWorks(ruta)
		console.log(institutions);
		if (institutions) {
			dispatch(setAllInstitutions(institutions))
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

export const setAllInstitutions = (institutions) => ({
	type: types.institucionAllLoad,
	payload: institutions
});