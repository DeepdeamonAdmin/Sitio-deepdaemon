//Uso de Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { types } from "../types/types";
import { uiCloseModal } from "./ui";

//Función para insertar un nuevo aviso en la BD
export const startsNewSign = (formValues) => {
	return async (dispatch) => {
		const newSign = {
			name: formValues.name,
			desc: formValues.desc,
			photo: formValues.urlImg
		}
		const docRef = await addDoc(collection(db, `Avisos/`), newSign);
		if (docRef) {
			Swal.fire('Aviso guardado', 'Éxito');

			//Envio al estado de un nuevo aviso
			dispatch(addNewSign(docRef.id, newSign));

			//Envio al estado del cierre del modal
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al guardar el aviso');
		}
	}
}

//Publicación en el estado del nuevo anuncio
export const addNewSign = (id, sign) => ({
	type: types.avisoAddNew,
	payload: {
		id, ...sign
	}
})

