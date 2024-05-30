//Uso de React
import React, { useEffect } from 'react';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de Firestore
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Componentes necesarios
import InfoVideo from './InfoVideo';
import {
  startsNewYoutube,
  startLoadingYoutube,
} from '../../../actions/youtube';

const FormEditVideo = () => {
  //Delcaración del dispatch
  const dispatch = useDispatch();

  //Obtención de los videos del estado
  var youtubes = useSelector((state) => state.youtubes);

  //Selección de los videos
  youtubes = youtubes.videos;

  //Contenido del formulario para agregar un nuevo video
  const [formValues, handleInputChange] = useForm({
    urlVideo: '',
    title: '',
  });
  const { urlVideo, title } = formValues;

  //Función para manejar la subida de un nuevo video
  const handleSubmit = (e) => {
    e.preventDefault();

    //Envio al estado de un nuevo video
    dispatch(startsNewYoutube(formValues));

    //Limpiar parámetros del formulario
    formValues.urlVideo = '';
    formValues.title = '';
  };

  //Uso de useEffect para cargar los videos
  useEffect(() => {}, []);

  //función para eliminar un video
  const deleteVideo = async (id) => {
    //Construcción de la dirección del video
    const youtubeDoc = doc(db, `Youtube/${id}`);

    //Esperar a ser eliminado
    await deleteDoc(youtubeDoc);
    Swal.fire('Video Eliminado', 'Éxito');

    //Enviar al estado la petición de carga de los videos
    dispatch(startLoadingYoutube());
  };

  //Despliegue del formulario y la lista de los videos
  return (
    <>
      <div className="container">
        <div className="row-6 d-flex  justify-content-center border-bottom border-secondary">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label>Url del video</label>
              <input
                className="form-control"
                type="text"
                name="urlVideo"
                placeholder="URL del Video"
                value={urlVideo}
                onChange={handleInputChange}
              />
            </div>
            <div className="row mb-3">
              <label>Título del video</label>
              <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Título del video"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="row mb-3 ">
              <button
                className="btn2 btn-primary btn-large btn-block"
                type="submit"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div style={{ marginTop: '20px' }}>
          {youtubes.map((video) => (
            <div className="card" style={{ maxWidth: '100%' }} key={video.id}>
              <div className="row d-flex align-items-center justify-content-between">
                <InfoVideo {...video} />
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      deleteVideo(video.id);
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FormEditVideo;
