// allow read, write: if request.auth != null;

import Swal from 'sweetalert2';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';
import { loadAllWorks } from '../helpers/loadAllWorks';


export const startNewProject = ( formValues ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { img } = getState().projects;

        const newProject = {
            name: formValues.name,
            descripcion: formValues.descripcion,
            impact: formValues.impact,
            urlImg: img || 'project.jpg',
            urlModalMedia: '',
            link: formValues.link,
            nameTech: formValues.nameTech,
            estado: formValues.estado
        }
    
        const docRef = await addDoc(collection(db, `Usuarios/${uid}/Projects`), newProject );
    
        if(docRef){
            Swal.fire('Reporte Enviado');
            dispatch( activeProject( docRef.id, newProject ) ); 
            dispatch( addNewProject( docRef.id, newProject ) ); 
        }else{
            Swal.fire('Error al enviar Reporte');
        }
    }
}


export const activeProject = ( id, project ) => ({
    type: types.projectActive,
    payload: {
        id,
        ...project
    }
});

export const addNewProject = ( id, project ) => ({
    type: types.projectAddNew,
    payload: {
        id, ...project
    }
})


export const startUploadingProject = ( file ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const ruta =`${uid}/imgProject`;
        const fileUrl = await fileUpload( ruta ,file );
        dispatch(loadImgProject(fileUrl));
        Swal.close();
    }
}

export const loadImgProject= ( url ) => ({
    type: types.projectImgAddNew,
    payload:url 
});



export const startLoadingProject = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const ruta =`Usuarios/${uid}/Projects`;
        const projects = await loadWorks( ruta );
        dispatch( setProjects( projects ));
        
    }
}

export const setProjects = ( projects ) => ({
    type: types.projectsLoad,
    payload: projects
});



export const startLoadinProjectsAll = () => {
    return async(dispatch) => {
        const ruta = 'Projects'
        const projects = await loadAllWorks(ruta); 
        console.log(projects);
        if(projects){
            dispatch(setAllProjects(projects));
        }else {
            Swal.fire('Error BD no identificada');
        }
    }
}

//mandar a redux los usuarios
export const setAllProjects = ( projects ) => ({
    type: types.projectsAllLoad,
    payload: projects
});
