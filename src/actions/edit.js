import { doc, updateDoc, setDoc, update } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { putProject } from "../selectors/put/putProject";
import { types } from "../types/types";
import { getAuth, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { fileUpload } from "../helpers/fileUpload";

export const editProject = (idProject, formValues) => {
	return async (dispatch, getState) => {
		
		console.log(formValues)
		const dataToFirestore = { ...formValues }
		const projectUpdate = updateDoc(doc(db, 'Proyectos', idProject), dataToFirestore)

		dispatch(refreshData(dataToFirestore))
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

					// signOut(user);
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
				// const { active: activeData } = getState().user;
				// Swal.fire({
				// 	title: 'Uploading...',
				// 	text: 'Please wait...',
				// 	allowOutsideClick: false,
				// 	onBeforeOpen: () => {
				// 		Swal.showLoading();
				// 	}
				// });
				// const ruta = `${formValues.id}/fotoPerfil`;
				// const fileUrl = fileUpload(ruta, file);
				// activeData.urlImg = fileUrl
				// dispatch(editUser(formValues, formValues.password));
				// Swal.close();
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