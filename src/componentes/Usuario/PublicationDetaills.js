import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { uiCurrentModal, uiOpenModal } from "../../actions/ui";
import { uiCloseModal } from '../../actions/ui';

import Modal from 'react-modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/DeepDaemon.css";

Modal.setAppElement('#app');

export const PublicationDetaills = ({ publication }) => {

  const { modalOpen } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const [currentModal, setCurrentModal] = useState(null);
  const [showInf, setShowInfo] = useState(false);

  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
  }

  const handleClickNew = () => {
    // dispatch(uiOpenModal());
    setShowInfo(!showInf);
  };
  return (
    <>
      <Popup //aqui inicia el modal que abrira la informacion de los lideres
        trigger={<button //Boton que activa el pop up
          className={`btn btn-primary`}
          onClick={handleClickNew}>
          {!showInf ? "Ver más.." : "Ver menos"}
        </button>}
        modal
        nested
      >
        {close => (
          <div className="modal-public">

            <div className="modalheader bg-primary"> {publication.title} </div>
            <div className="modalcontent" style={{ overflow: 'auto', maxHeight: '60vh'}}>
              {' '}
              <div className='d-flex flex-col animate__animated animate__fadeIn'>
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item`} style={{textAlign:'justify'}}><b>Abstract :</b><i> {publication.descr}</i></li>
                  <li className="list-group-item">Autor : {publication.autor}</li>

                  {publication.postType === 'magazine'? <li className="list-group-item">KeyWords : {publication.keywords}</li>: null}
                  {publication.postType === 'article'? <li className="list-group-item">Journal : {publication.journal}</li>: null}
                  {publication.postType === 'conference'? <li className="list-group-item">Congreso: {publication.booktitle}</li> : null}
                  {publication.postType === 'inbook'? <li className="list-group-item">Libro: {publication.booktitle}</li> : null}
                  <li className="list-group-item">Link de Consulta: <a href={publication.linkConsult} target="_blank">{publication.linkConsult}</a></li>
                </ul>
              </div>
            </div>
            <div className="modalactions">
              <button //boton para cerrar el modal en pop up 
                className={`btn btn-primary`}
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>

    
  );
};
