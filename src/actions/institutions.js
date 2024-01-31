//Uso de Firestore
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las laertas de las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { types } from "../types/types";

export const startsNewInstitution = (formValues) => {
	return async (dispatch) => {

		//Composición del documento a añadir en la BD
		const newInst = {
			name: formValues.name,
			shortName: formValues.shortName
		}

		//Inserción en la BD
		await setDoc(doc(db, 'Escuela', formValues.shortName), {
			'name': formValues.name,
			'shortName': formValues.shortName
		})
		Swal.fire('Institución salvada', 'Éxito');

		//Envio de la nueva institución al estado
		dispatch(addNewInstitution(formValues.shortName, newInst));
	}
}

//Publicación en el estado de una nueva "Intitución"
export const addNewInstitution = (id, inst) => ({
	type: types.institucionAddNew,
	payload: {
		id, ...inst
	}
})
