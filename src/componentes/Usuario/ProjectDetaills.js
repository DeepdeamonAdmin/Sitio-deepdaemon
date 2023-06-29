import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uiCurrentModal, uiOpenModal } from "../../actions/ui";
import { ModalInfoProject } from "./ModalInfoProject";
import { uiCloseModal } from '../../actions/ui';

import Modal from 'react-modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/DeepDaemon.css";

Modal.setAppElement('#app');

export const ProjectDetaills = ({project }) => {
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
      >{close => (
          <div className="modal-public">

            <div className="modalheader bg-primary"> {project.name} </div>
            <div className="modalcontent">
              {' '}
              <div className='d-flex flex-col animate__animated animate__fadeIn'>
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item`}><b>Descripción :</b><i> {project.descripcion}</i></li>
                </ul>
              </div>
            <div style={{textAlign: "center", height:"300px"}}>
                <hr />
                <iframe
                  //src="https://www.youtube.com/embed/OG0w_4qDiy8"
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
