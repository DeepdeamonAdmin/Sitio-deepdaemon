//Uso de Firestore
import { addDoc, collection, query, where, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { uiCloseModal } from './ui';
import { types } from '../types/types';
import { loadWorks } from '../helpers/loadWorks';

//Función para iniciar una tesis de grado
export const startNewTesisGrado = (formValues) => {
	return async (dispatch) => {
		const tesisRef = collection(db, "Tesis");
		const q = query(tesisRef, where("name", "==", formValues.name));
		const Data = await getDocs(q);
		const alumnosArray = [];
		for (let i = 0; i < formValues.alumnosLista.length; i++) {
			const docRef = doc(db, "Niveles/Grado/Licenciatura", formValues.alumnosLista[i]);
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					alumnosArray.push(formValues.alumnosLista[i]);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		}
		if (alumnosArray.length == 0) {
			if (Data.docs.length == 0) {
				const newTesis = {
					name: formValues.name,
					correo: formValues.correo,
					descripcion: formValues.descripcion,
					results: formValues.results,
					urlImg: formValues.urlImg,
					nameTech: formValues.nameTech,
					estado: formValues.estado,
					display: formValues.display,
					url: formValues.url,
					publisher: formValues.publisher,
					directoresLista: formValues.directoresLista ? formValues.directoresLista : 'Sin autores',
					alumnosLista: formValues.alumnosLista ? formValues.alumnosLista : 'Sin autores',
					grado: formValues.grado
				}
				const docRef1 = await addDoc(collection(db, "Tesis"), newTesis);
				if (docRef1) {
					Swal.fire('Tesis agregada', formValues.name, 'success');

					//Envio al estado de la tesis activa
					dispatch(activeTesis(docRef1.id, newTesis));

					//Envio al estado de la nueva tesis
					dispatch(addNewTesis(docRef1.id, newTesis));

					//Envio al estado del cierre del modal
					dispatch(uiCloseModal());
				} else {
					Swal.fire('Error al agregar tesis', 'error');
				}
			} else {
				Swal.fire('Error', 'La tesis que deseas agregar ya está registrada', 'error');
			}
		} else {
			Swal.fire('Error', 'Cada alumno solo puede tener una tesis por grado. Los alumnos que no cumplen con esto son: ' + alumnosArray, 'error');
		}
	}
}

//Función para iniciar una tesis de posgrado
export const startNewTesisPosgrado = (formValues) => {
	return async (dispatch) => {
		const tesisRef = collection(db, "Tesis");
		const q = query(tesisRef, where("name", "==", formValues.name));
		const Data = await getDocs(q);
		var ruta = "";
		var alumno = "";
		switch (formValues.grado) {
			case "Maestría":
				ruta = "Niveles/Posgrado/Maestria"
				break;
			case "Doctorado":
				ruta = "Niveles/Posgrado/Doctorado"
				break;
		}
		const docRef = doc(db, ruta, formValues.alumnosLista);
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				alumno = "exist";
			} else {
				console.log("No such document!");
			}
		} catch (error) {
			console.log("Error:", error);
		}
		if (alumno != "exist") {
			if (Data.docs.length == 0) {
				const newTesis = {
					name: formValues.name,
					correo: formValues.correo,
					descripcion: formValues.descripcion,
					results: formValues.results,
					urlImg: formValues.urlImg,
					nameTech: formValues.nameTech,
					estado: formValues.estado,
					display: formValues.display,
					url: formValues.url,
					publisher: formValues.publisher,
					directoresLista: formValues.directoresLista ? formValues.directoresLista : 'Sin autores',
					alumnosLista: formValues.alumnosLista ? formValues.alumnosLista : 'Sin autores',
					grado: formValues.grado
				}
				const newElement = {
					id: formValues.alumnosLista
				}
				const docRef1 = await addDoc(collection(db, "Tesis"), newTesis);
				if (docRef1) {
					Swal.fire('Tesis agregada', formValues.name, 'success');

					//Envio al estado de la tesis activa
					dispatch(activeTesis(docRef1.id, newTesis));

					//Envio al estado de la nueva tesis
					dispatch(addNewTesis(docRef1.id, newTesis));

					//Envio al estado el cierre del modal
					dispatch(uiCloseModal());
				} else {
					Swal.fire('Error al agregar tesis');
				}
				} else {
				Swal.fire('Error', 'La tesis que deseas agregar ya está registrada', 'error');
			}
		} else {
			Swal.fire('Error', 'Cada alumno solo puede tener una tesis por grado', 'error');
		}
	}
}

//Publicación en el estado la tesis activa
export const activeTesis = (id, tesis) => ({
	type: types.tesisActive,
	payload: {
		id,
		...tesis
	}
});

//Publicación en el estado la nueva tesis
export const addNewTesis = (id, tesis) => ({
	type: types.tesisAddNew,
	payload: {
		id, ...tesis
	}
})

//función de carga de las tesis de la BD
export const startLoadingTesis = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const ruta = `Tesis`;
		const tesis = await loadWorks(ruta);
		dispatch(setTesis(tesis));

	}
}

//Publicación en el estado las tesis cargadas
export const setTesis = (tesis) => ({
	type: types.tesisLoad,
	payload: tesis
});
