//Uso de Firestore
import { doc, updateDoc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { startLoadingProject } from '../../src/actions/projects';
import { startLoadingTesis } from '../../src/actions/tesis';
import {
  startLoadingPublication,
  startsNewBibtex,
} from '../../src/actions/publications';

//función para editar un proyecto
export const editProject = (idProject, formValues) => {
  return async (dispatch) => {
    const dataToFirestore = { ...formValues };
    await updateDoc(doc(db, 'Proyectos', idProject), dataToFirestore);

    //Envio al estado la carga de los proyectos
    await dispatch(startLoadingProject());
    Swal.fire('Informacion actualizada:', formValues.name, 'success');
  };
};

//Fucnión para la edición de una tesis de grado
export const editTesisGrado = (idTesis, formValues) => {
  return async (dispatch) => {
    const alumnosDelete = [];
    const alumnosNuevos = [];
    const alumnosArray = [];
    for (let i = 0; i < formValues.alumnosListaInit.length; i++) {
      if (!formValues.alumnosLista.includes(formValues.alumnosListaInit[i])) {
        alumnosDelete.push(formValues.alumnosListaInit[i]);
      }
    }
    for (let i = 0; i < formValues.alumnosLista.length; i++) {
      if (!formValues.alumnosListaInit.includes(formValues.alumnosLista[i])) {
        alumnosNuevos.push(formValues.alumnosLista[i]);
      }
    }
    if (alumnosDelete.length > 0) {
      for (let i = 0; i < alumnosDelete.length; i++) {
        const docRefdelete = await deleteDoc(
          doc(db, 'Niveles/Grado/Licenciatura/' + alumnosDelete[i]),
        );
      }
    }
    /*for (let i = 0; i < alumnosNuevos.length; i++) {
			const docRef = doc(db, "Niveles/Grado/Licenciatura", alumnosNuevos[i]);
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					alumnosArray.push(formValues.alumnosLista[i]);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		}*/
    if (alumnosArray.length == 0) {
      const dataToFirestore = {
        name: formValues.name,
        correo: formValues.correo,
        descripcion: formValues.descripcion,
        results: formValues.results,
        urlImg: formValues.urlImg,
        nameTech: formValues.nameTech,
        estado: formValues.estado,
        display: formValues.display,
        url: formValues.url,
        publisher: formValues.publisher,
        directoresLista: formValues.directoresLista
          ? formValues.directoresLista
          : 'Sin autores',
        alumnosLista: formValues.alumnosLista
          ? formValues.alumnosLista
          : 'Sin autores',
        grado: formValues.grado,
      };
      await updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore);

      //Envio al estado la carga de las tesis
      dispatch(startLoadingTesis());
      Swal.fire('Informacion actualizada:', formValues.name, 'success');
    } else {
      const dataToFirestore = {
        name: formValues.name,
        correo: formValues.correo,
        descripcion: formValues.descripcion,
        results: formValues.results,
        urlImg: formValues.urlImg,
        nameTech: formValues.nameTech,
        estado: formValues.estado,
        display: formValues.display,
        url: formValues.url,
        publisher: formValues.publisher,
        directoresLista: formValues.directoresLista
          ? formValues.directoresLista
          : 'Sin autores',
        alumnosLista: formValues.alumnosLista
          ? formValues.alumnosLista
          : 'Sin autores',
        grado: formValues.grado,
      };
      await updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore);

      //Envio al estado la carga de las tesis
      dispatch(startLoadingTesis());
      Swal.fire('Informacion actualizada:', formValues.name, 'success');
    }
  };
};

//Función para la edidión de una tesis de posgrado
export const editTesisPosgrado = (idTesis, formValues) => {
  return async (dispatch) => {
    var alumnoNuevo = false;
    var ruta = '';
    var alumno = '';
    switch (formValues.grado) {
      case 'Maestría':
        ruta = 'Niveles/Posgrado/Maestria';
        break;
      case 'Doctorado':
        ruta = 'Niveles/Posgrado/Doctorado';
        break;
    }
    if (formValues.alumnosListaInit != formValues.alumnosLista) {
      alumnoNuevo = true;
    }
    /*const docRef = doc(db, ruta, formValues.alumnosLista);
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				alumno = "exist";
			}
		} catch (error) {
			console.log("Error:", error);
		}*/
    if (true) {
      const dataToFirestore = {
        name: formValues.name,
        correo: formValues.correo,
        descripcion: formValues.descripcion,
        results: formValues.results,
        urlImg: formValues.urlImg,
        nameTech: formValues.nameTech,
        estado: formValues.estado,
        display: formValues.display,
        url: formValues.url,
        publisher: formValues.publisher,
        directoresLista: formValues.directoresLista
          ? formValues.directoresLista
          : 'Sin autores',
        alumnosLista: formValues.alumnosLista
          ? formValues.alumnosLista
          : 'Sin autores',
        grado: formValues.grado,
      };
      await updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore);

      //Envio al estado la carga de las tesis
      dispatch(startLoadingTesis());
      Swal.fire('Informacion actualizada:', formValues.name, 'success');
    } else {
      const dataToFirestore = {
        name: formValues.name,
        correo: formValues.correo,
        descripcion: formValues.descripcion,
        results: formValues.results,
        urlImg: formValues.urlImg,
        nameTech: formValues.nameTech,
        estado: formValues.estado,
        display: formValues.display,
        url: formValues.url,
        publisher: formValues.publisher,
        directoresLista: formValues.directoresLista
          ? formValues.directoresLista
          : 'Sin autores',
        alumnosLista: formValues.alumnosLista
          ? formValues.alumnosLista
          : 'Sin autores',
        grado: formValues.grado,
      };
      await updateDoc(doc(db, 'Tesis', idTesis), dataToFirestore);

      //Envio al estado la carga de las tesis
      dispatch(startLoadingTesis());
      Swal.fire('Informacion actualizada:', formValues.name, 'success');
    }
  };
};

//Función para la edición de una publicación
export const editPublication = (idPublication, formValues, bibtex_File) => {
  return async (dispatch) => {
    if (bibtex_File) {
      await dispatch(startsNewBibtex(formValues, bibtex_File));
    }
    const dataToFirestore = { ...formValues };
    await updateDoc(doc(db, 'Publicaciones', idPublication), dataToFirestore);

    //Envio al estado la carga de las publicaciones
    await dispatch(startLoadingPublication());
    Swal.fire('Informacion actualizada:', formValues.name, 'success');
  };
};

//Función para la edición de un usuario
export const editUser = (formValues, oldPassword) => {
  return async (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.email, oldPassword).then(
      ({ user }) => {
        updatePassword(user, formValues.password)
          .then(() => {
            if (!formValues.foto_perfil) delete formValues.foto_perfil;
            const dataToFirestore = { ...formValues };
            updateDoc(doc(db, 'Usuarios', formValues.id), dataToFirestore);

            //Envio al estado la actualización de los datos
            dispatch(refreshData(dataToFirestore));
            Swal.fire('Informacion actualizada:', formValues.title, 'success');
          })
          .catch((error) => {
            console.log(error);
          });
      },
    );
  };
};

//Publicación de las actualizaciones de los datos en el estado
const refreshData = (data) => ({
  type: types.userUpdate,
  payload: { ...data },
});
