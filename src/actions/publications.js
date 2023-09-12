// allow read, write: if request.auth != null;

import Swal from 'sweetalert2';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';
import { uiCloseModal } from './ui';
import { loadAllWorks } from '../helpers/loadAllWorks';


export const startNewPublication = ( formValues,bibtex_File) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { img, bibtex } = getState().publications;
        let fileUrl='';
        if(bibtex_File){
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            const ruta = ''
            fileUrl = await fileUpload(ruta, bibtex_File);
            dispatch(loadBibtex(fileUrl));
            Swal.close();
        }
        const newPublication = {
            postType: formValues.postType || '',
            urlImg: formValues.urlImg || '',
            descr: formValues.descr ||'',
            tech: formValues.tech || '',
            frontImg: img || 'img.jpg',
            link: formValues.link ||'',
            autor: formValues.autor ||'',
            title: formValues.title ||'',
            journal: formValues.journal ||'',
            yearMonth: formValues.yearMonth || '',
            volume: formValues.volume ||'',
            numbert: formValues.number ||'',
            pages: formValues.pages ||'',
            publisher: formValues.publisher ||'',
            address: formValues.address ||'',
            howpublished: formValues.howpublished ||'',
            booktitle: formValues.booktitle || '',
            editor: formValues.editor || '',
            series: formValues.series || '',
            organization: formValues.organization || '',
            school: formValues.school || '',
            note: formValues.note || '',
            institution: formValues.institution || '',
            display: formValues.display || 'No',
            keywords: formValues.keywords || '',
            bibtexfile: fileUrl || '',
        }
        const newPublicationInd = {
			postType: formValues.postType,
		}
    
        const docRef1 = await addDoc(collection(db, `Publicaciones`), newPublication);
        const docRef2 = await addDoc(collection(db, `Usuarios/${uid}/Publications`), newPublicationInd );
    
        if(docRef1 && docRef2 ){
            Swal.fire('Publicación agregada');
            dispatch( activePublication( docRef1.id, newPublication ) ); 
            dispatch( addNewPublication( docRef1.id, newPublication ) );
            dispatch(uiCloseModal()) 
        }else{
            Swal.fire('Error al registrar la publicación');
        }
    }
}

export const AddPublicationP = (item) => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		const newPublication = {
			postType: item.postType
		}

		const docRef = await addDoc(collection(db, `Usuarios/${uid}/Publications`), newPublication);
		
		if (docRef) {
			Swal.fire('Publicacion agregada');
			dispatch(uiCloseModal())
		} else {
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
        const ruta =`Publicaciones`;
        const publications = await loadWorks( ruta );
        dispatch( setPublications( publications ));
        
    }
}

export const setPublications = ( publications ) => ({
    type: types.publicationsLoad,
    payload: publications
})

export const startLoadinPublicationsAll = () => {
	return async (dispatch) => {
		const ruta = 'Publications'
		const publications = await loadAllWorks(ruta);
		if (publications) {
			dispatch(setAllPublications(publications));
		} else {
			Swal.fire('Error BD no identificada');
		}
	}
}

//mandar a redux los usuarios
export const setAllPublications = (publications) => ({
	type: types.publicationsAllLoad,
	payload: publications
});

/****************************** */
export const startsNewBibtex = (formValues) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { bibtexprueba } = getState().publications;

		const newBibtex = {
			name: formValues.name,
			file: bibtexprueba,
		}

		const docRef = await addDoc(collection(db, `Bibtex/${uid}/Files`), newBibtex);

		if (docRef) {
			Swal.fire('Archivo guardado', 'Éxito');
			dispatch(addNewtoBibtex(docRef.id, newBibtex));
			dispatch(uiCloseModal())
		} else {
			Swal.fire('Error al enviar archivo');
		}
	}
}
export const startUploadingBibtex = (file) => {
	return async (dispatch) => {

		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const ruta = ''
		const fileUrl = await fileUpload(ruta, file);
		dispatch(loadBibtex(fileUrl));
		Swal.close();
	}
}

export const loadBibtex = (url) => ({
	type: types.publicationsBibtexAddNew,
	payload: url
});
export const addNewtoBibtex = (id, bibtex) => ({
	type: types.publicationsBibtexAddNew,
	payload: {
		id, bibtex
	}
})