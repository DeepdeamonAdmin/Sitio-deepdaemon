import Swal from 'sweetalert2';
import {
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/firebase-config";
import { googleAuthProvider } from '../firebase/firebase-config';

import { types } from '../types/types';
import { startLoading, finishLoading, uiCloseModal } from './ui';

// const dispatch = useDispatch();
//Registrar usuario por correo
export const startRegisterWithEmailPassword = (formValues) => {
	return (dispatch) => {

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: formValues.name });

				completarDatos(user.uid, formValues);

				dispatch(
					uiCloseModal()
				);
			})
			.catch(e => {
				console.log(e);
				Swal.fire('Error', e.message, 'error');
			})

	}
}


const completarDatos = async (uid, formvalues) => {
	//agregamos los datos en fireStore
	await setDoc(doc(db, 'Usuarios', uid), {
		"rol": 'other',
		"nombre": formvalues.name,
		"email": formvalues.email,
		"password": formvalues.password,
		"password2": formvalues.password2,
		"fechaNac": '',
		'urlImg': '',
		'grado': '',
		"descripcion": '',
		"school": '',
		"unidad": '',
		"titulo": '',
		"linkedin": '',
		"facebook": '',
		"Github": '',
	})
	console.log('Se agrego la bd');

}

export const registroDesdeLider = (formValues) => {

	return (dispatch) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: formValues.name });

				completarDatosDesdeForm(user.uid, formValues);

				dispatch(
					uiCloseModal()
					// login(user.uid, user.displayName)
				);
			})
			.catch(e => {
				console.log(e);
				Swal.fire('Error', e.message, 'error');
			})
	}
}

const completarDatosDesdeForm = async (uid, formValues) => {
	//agregamos los datos en fireStore
	await setDoc(doc(db, 'Usuarios', uid), {
		"rol": 'other',
		"name": formValues.name,
		'lastname': formValues.lastname,
		'password': formValues.password,
		'linkedin': formValues.linkedin,
		'email': formValues.email,
		'shortDesc': formValues.shortDesc,
		'longDesc': formValues.longDesc,
		'status': formValues.status,
		'photo': formValues.photo,
		'ss': formValues.ss,
		'nivel': formValues.nivel,
		'start': formValues.start,
		'end': formValues.end,
		'idSchool': formValues.idSchool,
		'idCareer': formValues.idCareer
	})
}

export const registrarLider = (formValues) => {

	return (dispatch) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: formValues.name });

				completarDatosDeLider(user.uid, formValues);

				dispatch(
					uiCloseModal()
					// login(user.uid, user.displayName)
				);
			})
			.catch(e => {
				console.log(e);
				Swal.fire('Error', e.message, 'error');
			})
	}
}

const completarDatosDeLider = async (uid, formValues) => {
	//agregamos los datos en fireStore
	await setDoc(doc(db, 'Usuarios', uid), {
		"rol": 'administrador',
		"nombre": formValues.name,
		"email": formValues.email,
		"password": formValues.password,
		"fechaNac": '',
		'urlImg': 'https://firebasestorage.googleapis.com/v0/b/deepdaemon-bf419.appspot.com/o/oQKZ628qIJS3YIlV2VjZHW6ZSXQ2%2FfotoPerfilUsuario.jpg?alt=media&token=baf1bfc7-944d-4683-a998-8b730fa9c891',
		'grado': 'leader',
		"descripcion": '',
		"school": '',
		"unidad": '',
		"titulo": '',
		"linkedin": '',
		"facebook": '',
		"Github": '',
	})
	console.log('Se agrego la bd');
}

const completarDatosGoogle = async (uid, name, email) => {
	//Obtenemos el rol de la base si existe
	const docRef = doc(db, 'Usuarios', uid);
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();

	if (docSnap.exists()) {
		//agregamos los datos en fireStore
		if (data.rol === 'administrador') {
			await updateDoc(doc(db, 'Usuarios', uid), {
				"nombre": name,
				"email": email
			})
		} else {

			await setDoc(doc(db, 'Usuarios', uid), {
				"rol": 'other',
				"nombre": name,
				"email": email,
				"password": '',
				"password2": '',
				"fechaNac": '',
				'urlImg': '',
				'grado': '',
				"descripcion": '',
				"school": '',
				"unidad": '',
				"titulo": '',
				"linkedin": '',
				"facebook": '',
				"Github": '',
			})
			console.log('Se agrego la bd');
		}
	}

}



export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		const auth = getAuth();
		dispatch(startLoading());
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));

				dispatch(finishLoading());
			})
			.catch(e => {
				console.log(e);
				dispatch(finishLoading());
				Swal.fire('Error', e.message, 'error');
			})

	}
}


//accion para acceder por google
export const startGoogleLogin = () => {
	return (dispatch) => {
		const auth = getAuth();
		signInWithPopup(auth, googleAuthProvider)
			.then(({ user }) => {
				completarDatosGoogle(user.uid, user.displayName, user.email);
				dispatch(login(user.uid, user.displayName))
			});
	}
}

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
});


export const startLogout = () => {
	const auth = getAuth();
	return async (dispatch) => {
		await signOut(auth);

		dispatch(logout());
	}
}

// const closeModal = () => {
// 	dispatch(uiCloseModal());
// }

export const logout = () => ({
	type: types.logout
})


