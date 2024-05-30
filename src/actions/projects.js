//Uso de Firestore
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { loadWorks } from '../helpers/loadWorks';
import { uiCloseModal } from './ui';

//Función para insertar un nuevo proyecto en la BD
export const startNewProject = (formValues) => {
  return async (dispatch, getState) => {
    const projectsRef = collection(db, 'Proyectos');
    const q = query(projectsRef, where('name', '==', formValues.name));
    const Data = await getDocs(q);
    if (Data.docs.length === 0) {
      const { img } = getState().projects;
      const newProject = {
        name: formValues.name,
        correo: formValues.correo,
        descripcion: formValues.descripcion,
        results: formValues.results,
        urlImg: img || formValues.urlImg,
        nameTech: formValues.nameTech,
        estado: formValues.estado,
        display: formValues.display,
        url: formValues.url,
        publisher: formValues.publisher,
        directoresLista: formValues.directoresLista,
        colaboradoresLista: formValues.colaboradoresLista,
      };
      const docRef1 = await addDoc(collection(db, 'Proyectos'), newProject);
      if (docRef1) {
        Swal.fire('Proyecto agregado', formValues.name, 'success');

        //Envio al estado el proyecto activo
        dispatch(activeProject(docRef1.id, newProject));

        //Envio al estado el nuevo proyecto
        dispatch(addNewProject(docRef1.id, newProject));

        //Envio al estado del cierre del modal
        dispatch(uiCloseModal());
      } else {
        Swal.fire('Error al agregar el proyecto');
      }
    } else {
      Swal.fire('Error, el proyecto que deseas agregar ya está registrado');
    }
  };
};

//Publicación en el estado del proyecto activo
export const activeProject = (id, project) => ({
  type: types.projectActive,
  payload: {
    id,
    ...project,
  },
});

//Publicación en el estado del proyecto nuevo
export const addNewProject = (id, project) => ({
  type: types.projectAddNew,
  payload: {
    id,
    ...project,
  },
});

//Carga de los proyectos existentes en la BD
export const startLoadingProject = () => {
  return async (dispatch) => {
    const ruta = 'Proyectos';
    const projects = await loadWorks(ruta);
    dispatch(setProjects(projects));
  };
};

//Publicación en el estaod de los proyectos obtenidos de la BD
export const setProjects = (projects) => ({
  type: types.projectsLoad,
  payload: projects,
});
