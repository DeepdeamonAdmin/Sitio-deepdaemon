import { putProject } from "../selectors/put/putProject";
import { types } from "../types/types";

export const editProject = (formValues) => {
    //Datos project
    const {id, name, desc, impact, frontImg, modalMedia, modalType, link, idTech } = formValues;
    //datos tabla project y relacion tech_project
    const dataProject = {
        id: id,
        name: name,
        descr: desc,
        impact: impact,
        front_img: frontImg || 'project_front.jpg',
        modal_media: modalMedia ||'project_modal.jpg',
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

const valEditProject = (name) => ({
    type: types.editProject,
    payload: {
        name
    }
});