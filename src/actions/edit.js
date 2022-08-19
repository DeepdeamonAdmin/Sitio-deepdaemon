import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { putProject } from "../selectors/put/putProject";
import { types } from "../types/types";
import { getAuth, updateProfile } from "firebase/auth";
import { loadUser } from "../helpers/loadUser";

export const editProject = (formValues) => {
	//Datos project
	const { id, name, desc, impact, frontImg, modalMedia, modalType, link, idTech } = formValues;
	//datos tabla project y relacion tech_project
	const dataProject = {
		id: id,
		name: name,
		descr: desc,
		impact: impact,
		front_img: frontImg || 'project_front.jpg',
		modal_media: modalMedia || 'project_modal.jpg',
		modal_type: modalType || 'image',
		link: link,
		idTech: idTech || '1',
	}
	return (dispatch) => {
		//Enviar datos a project
		putProject(dataProject);
		dispatch(valEditProject(id))
	}

}

export const editLider = (formValues) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const user = await loadUser(uid);
		if (!formValues.foto_perfil) delete formValues.foto_perfil;
		const dataToFirestore = { ...formValues }
		await updateDoc(doc(db, 'Usuarios', formValues.id), dataToFirestore)

		dispatch(refreshData(dataToFirestore))
		Swal.fire('Informacion actualizada:', formValues.title, 'success')
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