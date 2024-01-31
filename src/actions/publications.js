//Uso de Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { getStorage, ref, deleteObject } from "firebase/storage";

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { loadWorks } from '../helpers/loadWorks';
import { uiCloseModal } from './ui';

//Función para iniciar una nueva publicación
export const startNewPublication = ( formValues,bibtex_File) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { img } = getState().publications;
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

            //Envio al estado la cargar del archivo Bibtex
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

            //Envio al estado de la publicación activa
            dispatch( activePublication( docRef1.id, newPublication ) );
            
            //Envio al estado de la nueva publicación
            dispatch( addNewPublication( docRef1.id, newPublication ) );

            //Envio al estado del cierre del modal
            dispatch(uiCloseModal()) 
        }else{
            Swal.fire('Error al registrar la publicación');
        }
    }
}

//Publicación en el estado de la publicación activa
export const activePublication = ( id, publication ) => ({
    type: types.publicationActive,
    payload: {
        id,
        ...publication
    }
});


//Publicación en el estado la nueva publicación
export const addNewPublication = ( id, publication ) => ({
    type: types.publicationAddNew,
    payload: {
        id, ...publication
    }
})

//Función de carga de las publicaciones en la BD
export const startLoadingPublication = () => {
    return async( dispatch ) => {
        const ruta ='Publicaciones';
        const publications = await loadWorks( ruta );
        await dispatch( setPublications( publications ));
    }
}

//Publicación de las publicaciones cargadas en el estado
export const setPublications = ( publications ) => ({
    type: types.publicationsLoad,
    payload: publications
})

//Función para subir un nuevo Bibtex
export const startsNewBibtex = (formValues,bibtex_File) => {
    let fileUrl='';
    return async( dispatch ) => {
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        const ruta = ''
        if(formValues.bibtexfile){
            const storage = getStorage();
            const textRegexString = new RegExp("/([^\/?]+)\\?","i");
			const information = formValues.bibtexfile.match(textRegexString);
            const desertRef = ref(storage, information[1]);
            deleteObject(desertRef).then(() => {
            }).catch((error) => {
            });
        }
        fileUrl = await fileUpload(ruta, bibtex_File);

        //Envio al estado la carga de un nuevo Bibtex
        dispatch(loadBibtex(fileUrl));
        formValues.bibtexfile = fileUrl;
        Swal.close();
    }
}

//Publicación del bibtex en el estado
export const loadBibtex = (url) => ({
	type: types.publicationsBibtexAddNew,
	payload: url
});