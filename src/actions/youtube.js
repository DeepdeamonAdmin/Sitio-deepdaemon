//Uso de Firestore
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { loadWorks } from '../helpers/loadWorks';

//Función para iniciar un nuevo documento de YouTube en la BD
export const startsNewYoutube = (formValues) => {
  return async (dispatch) => {
    const newInst = {
      urlVideo: formValues.urlVideo,
      title: formValues.title,
    };
    const newYoutube = await addDoc(collection(db, 'Youtube'), newInst);
    if (newYoutube) {
      Swal.fire('Video guardado con éxito', 'Éxito');

      //Envio al estado de un nuevo video de YouTube
      dispatch(youtubeAddNew(newYoutube.id, newInst));
    } else {
      Swal.fire('Error al agregar nuevo video de Youtube', 'error');
    }
  };
};

//Enviar el nuevo elemento de YouTube al estado
export const youtubeAddNew = (id, inst) => ({
  type: types.youtubeAddNew,
  payload: {
    id,
    ...inst,
  },
});

//Carga de todos los videos de YouTube
export const startLoadingYoutube = () => {
  return async (dispatch) => {
    const ruta = 'Youtube';
    const youtubes = await loadWorks(ruta);

    //Envio al estado de los videos obtenidos
    dispatch(setYoutubes(youtubes));
  };
};

//Envio al estado de los videos de YouTube cargados
export const setYoutubes = (youtubes) => ({
  type: types.youtubeLoad,
  payload: youtubes,
});
