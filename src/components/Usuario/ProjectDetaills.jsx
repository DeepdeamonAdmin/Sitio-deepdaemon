//Uso de React
import React, { useState } from 'react';

//Uso de Modal
import Modal from 'react-modal';

//Uso de Popup
import Popup from 'reactjs-popup';

//Componentes necesarios
import 'reactjs-popup/dist/index.css';
import '../../styles/DeepDaemon.css';

//Configuración del modal
Modal.setAppElement('#app');

export const ProjectDetaills = ({ project }) => {
  //Configuración del hook para mostrar la información
  const [showInf, setShowInfo] = useState(false);

  //Función para el manejo del clic
  const handleClickNew = () => {
    setShowInfo(!showInf);
  };

  //Despliegue de los detalles del proyecto
  return (
    <>
      <Popup //aqui inicia el modal que abrira la informacion de los lideres
        trigger={
          <button //Boton que activa el pop up
            className={`btn btn-primary`}
            onClick={handleClickNew}
          >
            {!showInf ? 'Ver más..' : 'Ver menos'}
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-public">
            <div className="modalheader bg-primary"> {project.name} </div>
            <div className="modalcontent">
              {' '}
              <div className="d-flex flex-col animate__animated animate__fadeIn">
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item`}>
                    <b>Descripción :</b>
                    <i> {project.descripcion}</i>
                  </li>
                </ul>
              </div>
              <div style={{ textAlign: 'center', height: '300px' }}>
                <hr />
                <iframe
                  src={project.url}
                  title="YouTube video player"
                  gesture="media"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  style={{ width: '70%', height: '80%' }}
                ></iframe>
              </div>
            </div>
            <div className="modalactions">
              <button //boton para cerrar el modal en pop up
                className={`btn btn-primary`}
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};
