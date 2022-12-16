// allow read, write: if request.auth != null;

import Swal from 'sweetalert2';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';
import { loadAllWorks } from '../helpers/loadAllWorks';
import { uiCloseModal } from './ui';
import { useNavigate } from 'react-router-dom';

export const startNewProject = (formValues) => {
	return async (dispatch, getState) => {
		//const navigate = useNavigate();
		const projectsRef = collection(db, "Proyectos");
		const q = query(projectsRef, where("name", "==", formValues.name));
		const Data = await getDocs(q);

		if (Data.docs.length == 0) {
			const { uid } = getState().auth;
			const { img } = getState().projects;
			const newProject = {
				name: formValues.name,
				correo: formValues.correo,
				descripcion: formValues.descripcion,
				results: formValues.results,
				urlImg: img || formValues.urlImg,
				nameTech: formValues.nameTech,
				estado: formValues.estado,
				display: formValues.display,
				url: formValues.url,
				publisher: formValues.publisher,
				autores: formValues.autores
			}

			const docRef1 = await addDoc(collection(db, "Proyectos"), newProject);
			//const docRef2 = await addDoc(collection(db, `Usuarios/${uid}/Projects`), newProjectInd);

			if (docRef1) {
				Swal.fire('Proyecto agregado', formValues.name, 'success');
				dispatch(activeProject(docRef1.id, newProject));
				dispatch(addNewProject(docRef1.id, newProject));
				dispatch(uiCloseModal())
				//navigate('/admin/projects');
			} else {
				Swal.fire('Error al agregar el proyecto');
			}
		} else {
			Swal.fire('Error, el proyecto que deseas agregar ya está registrado');
		}
	}
}

export const AddProjectTesis = (item) => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		const newProject = {
			name: item.name
		}

		const docRef = await addDoc(collection(db, `Usuarios/${uid}/Projects`), newProject);

		if (docRef) {
			Swal.fire('Proyecto agregado');
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al enviar Reporte');
		}
	}
}

export const activeProject = (id, project) => ({
	type: types.projectActive,
	payload: {
		id,
		...project
	}
});

export const addNewProject = (id, project) => ({
	type: types.projectAddNew,
	payload: {
		id, ...project
	}
})


export const startUploadingProject = (file) => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;

		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const ruta = `${uid}/imgProject`;
		const fileUrl = await fileUpload(ruta, file);
		dispatch(loadImgProject(fileUrl));
		Swal.close();
	}
}

export const loadImgProject = (url) => ({
	type: types.projectImgAddNew,
	payload: url
});



export const startLoadingProject = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const ruta = "Proyectos";
		const projects = await loadWorks(ruta);
		dispatch(setProjects(projects));

	}
}

export const setProjects = (projects) => ({
	type: types.projectsLoad,
	payload: projects
});



export const startLoadinProjectsAll = () => {
	return async (dispatch) => {
		const ruta = 'Projects'
		const projects = await loadAllWorks(ruta);
		if (projects) {
			dispatch(setAllProjects(projects));
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

//mandar a redux los usuarios
export const setAllProjects = (projects) => ({
	type: types.projectsAllLoad,
	payload: projects
});

