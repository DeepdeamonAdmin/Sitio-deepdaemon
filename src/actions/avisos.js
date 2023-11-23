import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from "../helpers/loadWorks";
import { types } from "../types/types";
import { uiCloseModal } from "./ui";

// import { fileUpload } from '../helpers/fileUpload';
import { loadAllUsers } from '../helpers/loadAllUsers';


export const startsNewSign = (formValues) => {
	return async (dispatch, getState) => {
		const newSign = {
			name: formValues.name,
			desc: formValues.desc,
			photo: formValues.urlImg
		}
		const docRef = await addDoc(collection(db, `Avisos/`), newSign);
		if (docRef) {
			Swal.fire('Aviso guardado', 'Éxito');
			dispatch(addNewSign(docRef.id, newSign));
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al guardar el aviso');
		}
	}
}
export const addNewSign = (id, sign) => ({
	type: types.avisoAddNew,
	payload: {
		id, ...sign
	}
})

