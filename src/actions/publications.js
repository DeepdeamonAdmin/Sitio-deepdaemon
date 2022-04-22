// allow read, write: if request.auth != null;

import Swal from 'sweetalert2';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';


export const startNewPublication = ( formValues ) => {
    return async( dispatch, getState ) => {
        const { postType, descr, nameTech, frontImg, link, autor,
            title, journal, yearMonth, volume, number, pages, publisher, address,
            howpublished, booktitle, editor, series, organization, school, note,
            institution} = formValues;

        const { uid } = getState().auth;
        const { img } = getState().publications;

        const newPublication = {
            postType: postType || 'article',
            descr: descr ||'',
            nameTech: nameTech || '',
            frontImg: img || 'img.jpg',
            link: link ||'',
            autor: autor ||'',
            title: title ||'',
            journal: journal ||'',
            yearMonth: yearMonth || '',
            volume: volume ||'',
            numbert: number ||'',
            pages: pages ||'',
            publisher: publisher ||'',
            address: address ||'',
            howpublished: howpublished ||'',
            booktitle: booktitle || '',
            editor: editor || '',
            series: series || '',
            organization: organization || '',
            school: school || '',
            note: note || '',
            institution: institution || ''
        }
    
        const docRef = await addDoc(collection(db, `Usuarios/${uid}/Publications`), newPublication );
    
        if(docRef){
            Swal.fire('Reporte Enviado');
            dispatch( activePublication( docRef.id, newPublication ) ); 
            dispatch( addNewPublication( docRef.id, newPublication ) ); 
        }else{
            Swal.fire('Error al enviar Reporte');
        }
    }
}


export const activePublication = ( id, publication ) => ({
    type: types.publicationActive,
    payload: {
        id,
        ...publication
    }
});

export const addNewPublication = ( id, publication ) => ({
    type: types.publicationAddNew,
    payload: {
        id, ...publication
    }
})


export const startUploadingPublication = ( file ) => {
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

        const ruta =`${uid}/imgPublication`;
        const fileUrl = await fileUpload( ruta ,file );
        dispatch(loadImgPublication(fileUrl));
        Swal.close();
    }
}

export const loadImgPublication= ( url ) => ({
    type: types.publicationImgAddNew,
    payload:url 
});



export const startLoadingPublication = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const ruta =`Usuarios/${uid}/Publications`;
        const publications = await loadWorks( ruta );
        dispatch( setPublications( publications ));
        
    }
}

export const setPublications = ( publications ) => ({
    type: types.publicationsLoad,
    payload: publications
});