import { deleteHProject } from "../selectors/delete/deleteHProject";
import { memberDelete } from "../selectors/delete/memberDelete";
import { types } from "../types/types";

export const deleteProject = (id) => {

    return async(dispatch) => {
        //Enviar datos a school
        const dataProject = {
            id: id
        };
        deleteHProject(dataProject);
        dispatch(valDelProject(id));
    }
}

export const deleteMember = (id) => {

    return async(dispatch) => {
        //Enviar datos a school
        const dataMember = {
            id: id
        };
        memberDelete(dataMember);
        dispatch(valDelMember(id));
    }
}


const valDelProject = (id) => ({
    type: types.delProject,
    payload:{
        id
    }
})

const valDelMember = (id) => ({
    type: types.delMember,
    payload:{
        id
    }
})

