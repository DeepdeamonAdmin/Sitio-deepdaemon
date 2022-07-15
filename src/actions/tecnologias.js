import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadAllWorks } from "../helpers/loadAllWorks";
import { types } from "../types/types";

export const startsNewTech = (formValues) => {
	return async (dispatch) => {
		const newInst = {
			nombre: formValues.name,
		}
        await setDoc(doc(db, 'Tecnologias', formValues.name), {
			'nombre': formValues.name
		})
		Swal.fire('Tecnología guardada', 'Éxito');
        dispatch(addNewTech(formValues.name, newInst));
	}
}

export const addNewTech = (id, inst) => ({
	type: types.addNewTech,
	payload: {
		id, ...inst
	}
})


export const startLoadingTechsAll = () => {
	console.log('entra');
	return async (dispatch) => {
		const ruta = 'Tecnologias'
		const tech = await loadAllWorks(ruta)
		console.log(tech);
		if (tech) {
			dispatch(setAlltechs(tech))
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

export const setAlltechs = (tech) => ({
	type: types.institucionAllLoad,
	payload: tech
});