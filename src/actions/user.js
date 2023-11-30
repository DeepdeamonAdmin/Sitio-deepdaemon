import Swal from 'sweetalert2';

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';

// import { fileUpload } from '../helpers/fileUpload';
import { fileUpload } from '../helpers/fileUpload';

import { loadWorks } from '../helpers/loadWorks';


export const getUserRolUid = () => {
	return async (dispatch, getState) => {

		//obtenermos el uid 
		const { uid } = getState().auth;

		const docRef = doc(db, 'Usuarios', uid);
    	const docSnap = await getDoc(docRef);
    	const user = docSnap.data();

		//verificamos que obtenimos el documento 
		if (user !== '') {
			//mandamos el rol redux
			dispatch(getUserRol(user.rol));
			dispatch(getUser(user));
		} else {
			Swal.fire('Error rol no identificado');
		}
	}
}

//obtener datos usuario actual en redux
const getUserRol = (rol) => (
	{
		type: types.userRolGet,
		payload: rol
	}
)

const getUser = (datos) => ({
	type: types.userGet,
	payload: datos

});


export const activeData = (data) => ({
	type: types.dataActive,
	payload: { ...data }
});


export const startSaveData = (data) => {

	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!data.foto_perfil) {
			delete data.foto_perfil;
		}

		const dataToFirestore = { ...data };
		await updateDoc(doc(db, 'Usuarios', uid), dataToFirestore);

		dispatch(refreshData(dataToFirestore));
		Swal.fire('Saved User:', data.title, 'success');
	}
}

export const refreshData = (data) => ({
	type: types.userUpdate,
	payload: { ...data }
})

export const startUploading = (file) => {
	return async (dispatch, getState) => {

		const { active: activeData } = getState().user;
		const { uid } = getState().auth;

		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const ruta = `${uid}/fotoPerfil`;


		const fileUrl = await fileUpload(ruta, file);
		activeData.urlImg = fileUrl;
		dispatch(startSaveData(activeData));
		Swal.close();
	}
}

//Obtener los usuarios
export const startLoadingUsers = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const ruta =`Usuarios`;
        const users = await loadWorks( ruta );
        await dispatch( setUsers( users ));
    }
}

//mandar a redux los usuarios
export const setUsers = (users) => ({
	type: types.usersLoad,
	payload: users
});

