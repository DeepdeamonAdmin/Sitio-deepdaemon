//Uso de Firestores
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para alertar sobre las ejecuciones
import Swal from "sweetalert2";

//Uso de los tipos de acciones en el estado
import { types } from "../types/types";

//Función para ñadir una nueva "Career" a la BD
export const startsNewCareer = (formValues) => {
	return async (dispatch) => {

		//Composición del documento a añadir en la BD
		const newInst = {
			name: formValues.name,
		}

		//Inserción en la BD
		const newCareer = await addDoc(collection(db, 'Carrera'), newInst)

		//Condición de verificación de inserción
		if(newCareer) {
			Swal.fire('Carrera guardada con éxito', 'Éxito');

			//Enviar al estado el aviso de inserción de una nueva "Career"
        	dispatch(addNewCareer(newCareer.id, newInst));
		} else {
			Swal.fire('Error al agregar carrera', 'error')
		}
	}
}

//Función para actualizar el estado de tal manera que muestra la inserción de una nueva "Career"
//(Si se desea tener en el estado las carreras y ver sus actualizaciones, faltaría por implementar su reducer y sus actualizaciones en el estado)
export const addNewCareer = (id, inst) => ({
	type: types.careerAddNew,
	payload: {
		id, ...inst
	}
})