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

export const PublicationDetaills = ({ publication }) => {
  //Configuración del hook para mostrar información
  const [showInf, setShowInfo] = useState(false);

  //Función para el manejo del clic
  const handleClickNew = () => {
    setShowInfo(!showInf);
  };

  //Despliegue de los detalles de las publicaciones
  return (
    <>
      <Popup
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
            <div className="modalheader bg-primary"> {publication.title} </div>
            <div
              className="modalcontent"
              style={{ overflow: 'auto', maxHeight: '60vh' }}
            >
              {' '}
              <div className="d-flex flex-col animate__animated animate__fadeIn">
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item`}
                    style={{ textAlign: 'justify' }}
                  >
                    <b>Abstract :</b>
                    <i> {publication.descr}</i>
                  </li>
                  <li className="list-group-item">
                    Autor : {publication.autor}
                  </li>
                  {publication.postType === 'magazine' ? (
                    <li className="list-group-item">
                      KeyWords : {publication.keywords}
                    </li>
                  ) : null}
                  {publication.postType === 'article' ? (
                    <li className="list-group-item">
                      Journal : {publication.journal}
                    </li>
                  ) : null}
                  {publication.postType === 'conference' ? (
                    <li className="list-group-item">
                      Congreso: {publication.booktitle}
                    </li>
                  ) : null}
                  {publication.postType === 'inbook' ? (
                    <li className="list-group-item">
                      Libro: {publication.booktitle}
                    </li>
                  ) : null}
                  <li className="list-group-item">
                    Link de Consulta:{' '}
                    <a href={publication.linkConsult} target="_blank">
                      {publication.linkConsult}
                    </a>
                  </li>
                </ul>
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
