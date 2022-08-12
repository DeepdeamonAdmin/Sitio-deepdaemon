import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadAllWorks } from "../helpers/loadAllWorks";
import { types } from "../types/types";

export const startNewComment = (formValues) => {
    //Obtener la fecha en string
    const date = new Date();
    const dateString = date.toLocaleDateString();
    //Cambiar el formato de la fecha de / a -
    const dateString2 = dateString.replace(/\//g, "-");
    //Obtener la hora en string
    const hour = new Date();
    const hourString = hour.toLocaleTimeString();
    //Cambiar el formato de la hora de / a :
    const hourString2 = hourString.replace(/\:/g, ":");
    //Obtener la fecha y hora en string
    const dateHourString = dateString2 + "_" + hourString2;
    
	return async (dispatch) => {
		const newInst = {
			Nombre: formValues.Nombre,
			Comentario: formValues.Comentario,
            Foto : formValues.Foto,
		}
		await setDoc(doc(db, 'Blog', dateHourString), {
			'Nombre': formValues.Nombre,
			'Comentario': formValues.Comentario,
            'Foto': formValues.Foto
		})
		Swal.fire('Comentario publicado', 'Éxito');
		dispatch(addNewComment(dateHourString, newInst));
	}
}

export const addNewComment = (id, inst) => ({
	type: types.addNewComment,
	payload: {
		id, ...inst
	}
})


export const startLoadingCommentsAll = () => {
	console.log('entra');
	return async (dispatch) => {
		const ruta = 'Blog'
		const comments = await loadAllWorks(ruta)
		console.log(comments);
		if (comments) {
			dispatch(setAllComments(comments))
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

export const setAllComments = (comments) => ({
	type: types.commentAllLoad,
	payload: comments
});