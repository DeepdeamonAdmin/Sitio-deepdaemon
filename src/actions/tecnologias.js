//Uso de Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { types } from "../types/types";

//función para insertar une nueva tecnología en la BD
export const startsNewTech = (formValues) => {
	return async (dispatch) => {
		const newInst = {
			nombre: formValues.name,
		}
        const newTech = await addDoc(collection(db, 'Tecnologias'), newInst)
		if(newTech) {
			Swal.fire('Tecnología guardada con éxito', 'Éxito');

			//Envio al estado de la nuevo tecnología
        	dispatch(addNewTech(formValues.name, newInst));
		} else {
			Swal.fire('Error al agrega la tecnología', 'error')
		}
	}
}

//Publicación en el estado de la nueva tecnología
export const addNewTech = (id, inst) => ({
	type: types.techAddNew,
	payload: {
		id, ...inst
	}
})
