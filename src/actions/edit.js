import { doc, updateDoc, setDoc, update, deleteDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { getAuth, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { startLoadingProject } from "../../src/actions/projects"
import { startLoadingTesis } from "../../src/actions/tesis"
import { startLoadingPublication, startsNewBibtex } from "../../src/actions/publications"

export const editProject = (idProject, formValues) => {
	return async (dispatch, getState) => {

		const dataToFirestore = { ...formValues }
		const projectUpdate = updateDoc(doc(db, 'Proyectos', idProject), dataToFirestore)

		//dispatch(refreshData(dataToFirestore))
		dispatch(startLoadingProject())
		Swal.fire('Informacion actualizada:', formValues.name, 'success')

	}
}

export const editTesisGrado = (idTesis, formValues) => {
	return async (dispatch) => {

		const alumnosDelete = [];
		const alumnosNuevos = [];
		const alumnosArray = [];
		var flagFound = false;
		for (let i = 0; i < formValues.alumnosListaInit.length; i++) {
			if (!formValues.alumnosLista.includes(formValues.alumnosListaInit[i])) {
				alumnosDelete.push(formValues.alumnosListaInit[i]);
			}
		}
		for (let i = 0; i < formValues.alumnosLista.length; i++) {
			if (!formValues.alumnosListaInit.includes(formValues.alumnosLista[i])) {
				alumnosNuevos.push(formValues.alumnosLista[i]);
			}
		}

		if (alumnosDelete.length > 0) {
			for (let i = 0; i < alumnosDelete.length; i++) {
				const docRefdelete = await deleteDoc(doc(db, "Niveles/Grado/Licenciatura/" + alumnosDelete[i]));
			}
		}


		for (let i = 0; i < alumnosNuevos.length; i++) {
			const docRef = doc(db, "Niveles/Grado/Licenciatura", alumnosNuevos[i]);
			console.log("docRef:" + docRef.id);

			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					alumnosArray.push(formValues.alumnosLista[i]);
					console.log("Document data:", docSnap.data());
					console.log("array: ", alumnosArray);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		}

		if (alumnosArray.length == 0) {
			const dataToFirestore = {
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
			const projectUpdate = updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore)
			dispatch(startLoadingTesis())
			Swal.fire('Informacion actualizada:', formValues.name, 'success')

			//codigo para crear el nuevo elemento en niveles
			for (let i = 0; i < alumnosNuevos.length; i++) {
				const newElement = {
					id: alumnosNuevos[i]
				}
				const docRef = await setDoc(doc(db, "Niveles/Grado/Licenciatura", alumnosNuevos[i]), newElement);
			}
		} else {
			const dataToFirestore = {
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
			const projectUpdate = updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore)
			dispatch(startLoadingTesis())
			Swal.fire('Informacion actualizada:', formValues.name, 'success')
		}
	}
}

export const editTesisPosgrado = (idTesis, formValues) => {
	return async (dispatch) => {

		const alumnoNuevo = false;
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

		if (formValues.alumnosListaInit != formValues.alumnosLista) {
			const docRefdelete = await deleteDoc(doc(db, ruta + "/" + formValues.alumnosListaInit));
			alumnoNuevo = true;
		}

		const docRef = doc(db, ruta, formValues.alumnosLista);

		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				alumno = "exist";
			}
		} catch (error) {
			console.log("Error:", error);
		}



		if (alumno != "exist") {

			//codigo para editar
			const dataToFirestore = {
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

			const projectUpdate = updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore)
			dispatch(startLoadingTesis())
			Swal.fire('Informacion actualizada:', formValues.name, 'success')

			//codigo para crear el nuevo elemento en niveles

			const newElement = {
				id: formValues.alumnosLista
			}
			const docRef2 = await setDoc(doc(db, ruta, formValues.alumnosLista), newElement);


		} else {
			const dataToFirestore = {
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

			const projectUpdate = updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore)
			dispatch(startLoadingTesis())
			Swal.fire('Informacion actualizada:', formValues.name, 'success')
		}
	}
}

export const editPublication = (idPublication, formValues, bibtex_File) => {
	return async (dispatch, getState) => {
		if(bibtex_File){
			const { url } = getState().publications;
			//console.log("Si hay bibtex");
			await dispatch(startsNewBibtex(formValues,bibtex_File));
			//console.log(formValues.bibtexfile);
			//console.log(url);
		}
		const dataToFirestore = { ...formValues };
		const publicationUpdate = updateDoc(doc(db, 'Publicaciones', idPublication), dataToFirestore);

		await dispatch(startLoadingPublication());
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
