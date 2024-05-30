//Uso de React
import React, { useState } from 'react';

//Uso de Modal
import Modal from 'react-modal';

//Uso de Popup
import Popup from 'reactjs-popup';

//Componentes necesarios
import 'reactjs-popup/dist/index.css';
import '../../styles/DeepDaemon.css';

//Configuración en página del modal
Modal.setAppElement('#app');

export const LeaderDetaills = ({ leader, color }) => {
  //Configuración del hook para mostrar la información
  const [showInf, setShowInfo] = useState(false);

  //Función para manejar clic
  const handleClickNew = () => {
    setShowInfo(!showInf);
  };

  //Configuración de las propiedades de diseño
  const customContentStyle = {
    width: '70%', // Personaliza el ancho del contenido
    height: '70%', // Personaliza la altura del contenido
    overflowX: 'hidden', // Añade desplazamiento si el contenido excede las dimensiones del modal
    overflowY: 'auto',
  };

  //Configuración del background
  const customOverlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Personaliza el color y transparencia del fondo de superposición
  };

  //Despliegue de los detalles de los líderes
  return (
    <>
      <Popup
        trigger={
          <button className={`btn btn-primary`} onClick={handleClickNew}>
            {!showInf ? 'Ver más..' : 'Ver menos'}
          </button>
        }
        modal
        nested
        contentStyle={customContentStyle}
        overlayStyle={customOverlayStyle}
      >
        {(close) => (
          <div className="modal-leader">
            <div className="modalheader bg-primary">{leader.nombre}</div>
            <div className="modalcontent pb-0">
              <div className="container d-flex animate__animated animate__fadeIn">
                <div className="Row d-flex flex-wrap">
                  <div className="col-sm-4 mr-0 pl-0 pr-0">
                    <img
                      className="img-fluid"
                      src={leader.urlImg}
                      alt="member"
                      style={{
                        width: '200px',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="col-sm-8 pr-0 pl-0 mr-0 ml-0">
                    <ul className="list-group list-group-flush">
                      <li className={`list-group-item`}>
                        <b>Sobre mi:</b>
                        <i> {leader.descripcion} </i>
                      </li>
                      <li className="list-group-item">Email: {leader.email}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modalactions"
              style={{ position: 'relative', bottom: '10px', right: '10px' }}
            >
              <button
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
