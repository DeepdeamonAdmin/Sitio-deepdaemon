import React from 'react';
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { collection, getDoc, getDocs, deleteDoc, updateDoc, doc, where, query } from 'firebase/firestore';
import { db } from "../firebase/firebase-config";
import { startLoading } from './ui';
import { startLoadingProject } from '../../src/actions/projects';

export const deleteProjectGeneral = (id) => {

    return async (dispatch) => {
        const deleteProject = await deleteDoc(doc(db, "Proyectos", id));
        if (!deleteProject) {
            Swal.fire({
                title: 'Proyecto eliminado',
                icon: 'success',
            })
            dispatch(valDelProject(id));
        } else {
            Swal.fire('Error al eliminar el proyecto');
        }
    }
}

export const deleteProjectUser = (id) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const ref = collection(db, `Usuarios/${uid}/Projects`);
        const q = query(ref, where("name", "==", id));
        const Data = await getDocs(q);
        const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const projectRef = arrayData[0];

        const deleteProject = await deleteDoc(doc(db, `Usuarios/${uid}/Projects`, projectRef.id));

        if (!deleteProject) {
            Swal.fire({
                title: 'Proyecto eliminado',
                icon: 'success',
            })
            dispatch(valDelProject(id));
        } else {
            Swal.fire('Error al eliminar el proyecto');
        }
    }
}

export const deleteProjectAdmin = (id) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const ref = collection(db, `Usuarios/${uid}/Projects`);
        const q = query(ref, where("name", "==", id));
        const Data = await getDocs(q);
        const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const projectRef = arrayData[0];

        await deleteDoc(doc(db, `Usuarios/${uid}/Projects`, projectRef.id));

        dispatch(valDelProject(id));
    }
}

export const deleteMember = (id) => {

    const updateMember = async (e) => {
        e.preventDefault();
        const memberRef = doc(db, 'Usuarios', id);
        const data = { display: 'N' };
        updateDoc(memberRef, data);
    }

    updateMember();

}

export const deletePublicacion = (item) => {

    return async (dispatch, getState) => {
        //const { uid } = getState().auth;
        // const ref = collection(db, "Tesis");
        // const q = query(ref, where("publisher", "==", item.name));
        // const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // const projectRef = arrayData[0];

        const deletePublication = await deleteDoc(doc(db, "Publicaciones", item.id));

        if (!deletePublication) {
            Swal.fire({
                title: 'Publicacion eliminada',
                icon: 'success',
            })
        } else {
            Swal.fire('Error al eliminar publicacion');
        }
    }
}
export const deleteUserExt = (item) => {

    return async (dispatch, getState) => {
        //const { uid } = getState().auth;
  
        const deleteUsrExt = await deleteDoc(doc(db, "Usuarios", item.id));

        if (!deleteUsrExt) {
            Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
            })
        } else {
            Swal.fire('Error al eliminar usuario');
        }
    }
}
export const deleteTesisUser = (item) => {

    return async (dispatch, getState) => {
        //const { uid } = getState().auth;
        // const ref = collection(db, "Tesis");
        // const q = query(ref, where("publisher", "==", item.name));
        // const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // const projectRef = arrayData[0];

        const deleteProject = await deleteDoc(doc(db, "Tesis", item.id));

        if (!deleteProject) {
            Swal.fire({
                title: 'Tesis eliminada',
                icon: 'success',
            })
        } else {
            Swal.fire('Error al eliminar tesis');
        }
    }
}

const valDelProject = (id) => ({
    type: types.delProject,
    payload: {
        id
    }
})

const valDelMember = (id) => ({
    type: types.delMember,
    payload: {
        id
    }
})

