import Swal from 'sweetalert2';

import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';

// import { fileUpload } from '../helpers/fileUpload';
import { loadUser } from '../helpers/loadUser';
import { fileUpload } from '../helpers/fileUpload';
import { loadAllUsers } from '../helpers/loadAllUsers';

import { loadWorks } from '../helpers/loadWorks';


export const getUserRolUid = () => {
	return async (dispatch, getState) => {

		//obtenermos el uid 
		const { uid } = getState().auth;
		const user = await loadUser(uid);

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


//Obtener todos los uasuarios 
export const startLoadinUsersAll = () => {
	return async (dispatch) => {
		const ruta = '/Usuarios'
		const users = await loadAllUsers(ruta);
		//verificamos que obtenemos el documento 
		if (users) {
			dispatch(setUsers(users));
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

//mandar a redux los usuarios
export const setUsers = (users) => ({
	type: types.usersLoad,
	payload: users
});

export const startLoadinUserExt = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const ruta =`Usuarios`;
        const userExt = await loadAllUsers( ruta );
        dispatch( setUsers( userExt ));
        
    }
}
