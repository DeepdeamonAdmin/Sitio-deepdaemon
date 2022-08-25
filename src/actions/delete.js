import { deleteHProject } from "../selectors/delete/deleteHProject";
import { memberDelete } from "../selectors/delete/memberDelete";
import { types } from "../types/types";

import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";

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

    const updateMember = async(e) => {
        e.preventDefault();
        const memberRef = doc(db, 'Usuarios', id);
        const data = {display: 'N'};
        updateDoc (memberRef, data);
    }

    updateMember();

    //

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

