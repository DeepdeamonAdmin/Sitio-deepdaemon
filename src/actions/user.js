//Uso de Firestore
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';

//Función para obtener el rol del usuario
export const getUserRolUid = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const docRef = doc(db, 'Usuarios', uid);
    	const docSnap = await getDoc(docRef);
    	const user = docSnap.data();
		if (user !== '') {
			
			//Envio al estado del rol del usuario
			dispatch(getUserRol(user.rol));

			//Envio al estado del usuario
			dispatch(getUser(user));
		} else {
			Swal.fire('Error rol no identificado');
		}
	}
}

//Función para publicar en el estado el rol del usuario
const getUserRol = (rol) => (
	{
		type: types.userRolGet,
		payload: rol
	}
)

//Función para publicar en el estado el usuario
const getUser = (datos) => ({
	type: types.userGet,
	payload: datos

});

//Función para guaradar los datos de los usuarios
export const startSaveData = (data) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		if (!data.foto_perfil) {
			delete data.foto_perfil;
		}
		const dataToFirestore = { ...data };
		await updateDoc(doc(db, 'Usuarios', uid), dataToFirestore);

		//Envio al estado la actualización de datos
		dispatch(refreshData(dataToFirestore));
		Swal.fire('Saved User:', data.title, 'success');
	}
}

//Función para publicar las actualizaciones de datos en el estado
export const refreshData = (data) => ({
	type: types.userUpdate,
	payload: { ...data }
})

//Función para cargar el archivo de foto de perfil
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

		//Envio al estado de la función de alamacenar la información
		dispatch(startSaveData(activeData));
		Swal.close();
	}
}

//Función para publicar los datos en el estado
export const activeData = (data) => ({
	type: types.dataActive,
	payload: { ...data }
});

//Obtener los usuarios
export const startLoadingUsers = () => {
    return async( dispatch, getState ) => {
        const ruta =`Usuarios`;
        const users = await loadWorks( ruta );
        await dispatch( setUsers( users ));
    }
}

//Publicar a los usuarios en el estado
export const setUsers = (users) => ({
	type: types.usersLoad,
	payload: users
});

