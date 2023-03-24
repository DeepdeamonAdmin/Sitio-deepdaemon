import { doc, updateDoc, setDoc, update } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { getAuth, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import {startLoadingProject} from "../../src/actions/projects"
import {startLoadingTesis} from "../../src/actions/tesis"
import {startLoadingPublication} from "../../src/actions/publications"

export const editProject = (idProject, formValues) => {
	return async (dispatch, getState) => {

		const dataToFirestore = { ...formValues }
		const projectUpdate = updateDoc(doc(db, 'Proyectos', idProject), dataToFirestore)

		//dispatch(refreshData(dataToFirestore))
		dispatch(startLoadingProject())
		Swal.fire('Informacion actualizada:', formValues.name, 'success')

	}
}

export const editTesis = (idTesis, formValues) => {
	return async (dispatch, getState) => {

		const dataToFirestore = { ...formValues }
		const projectUpdate = updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore)

		//dispatch(refreshData(dataToFirestore))
		dispatch(startLoadingTesis())
		Swal.fire('Informacion actualizada:', formValues.name, 'success')

	}
}

export const editPublication = (idPublication, formValues) => {
	return async (dispatch, getState) => {
		
		const dataToFirestore = { ...formValues }
		const publicationUpdate = updateDoc(doc(db, 'Publicaciones', idPublication), dataToFirestore)

		//dispatch(refreshData(dataToFirestore))
		dispatch(startLoadingPublication())
		Swal.fire('Informacion actualizada:', formValues.name, 'success')
		
	}
}

export const editUser = (formValues, oldPassword) => {
	return async (dispatch) => {
		const auth = getAuth()
		signInWithEmailAndPassword(auth, formValues.email, oldPassword)
			.then(({ user }) => {
				updatePassword(user, formValues.password).then(() => {
					if (!formValues.foto_perfil) delete formValues.foto_perfil;

					const dataToFirestore = { ...formValues }
					updateDoc(doc(db, 'Usuarios', formValues.id), dataToFirestore)

					dispatch(refreshData(dataToFirestore))
					Swal.fire('Informacion actualizada:', formValues.title, 'success')

				}).catch((error) => {
					console.log(error);
				});
			})


	}
}

export const startEditingPicture = (formValues, file) => {
	return async (dispatch, getState) => {
		const auth = getAuth()
		signInWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then(({ user }) => {
			}).catch((error) => {
				console.log(error);
			});
	}
}



const refreshData = (data) => ({
	type: types.userUpdate,
	payload: { ...data }
})

const valEditProject = (name) => ({
	type: types.editProject,
	payload: {
		name
	}
});


export const getProjectsAutor = (idUser) => {
	return async (dispatch, getState) => {

		// // Create a reference to the projects collection
		// const  projectRef = db.collection('Proyectos');

		// // Create a query against the collection
		// const queryRef = projectRef.where('autores', 'array-contains',
		// idUser).get();

		// console.log(queryRef)
	}
}