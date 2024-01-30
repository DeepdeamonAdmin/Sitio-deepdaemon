import { types } from "../types/types";
import Swal from 'sweetalert2';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase-config";

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

const valDelMember = (id) => ({
    type: types.delMember,
    payload: {
        id
    }
})

