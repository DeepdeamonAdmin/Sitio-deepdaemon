//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import './Ui.css';

export const FotosGallery = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Función para manejar el clic sobre el botón
  const handleClickNew = () => {
    //Enviar al estado la apertura del modal
    dispatch(uiOpenModal());
  };

  //Despliegue del botón para cambiar una foto a través del modal
  return (
    <button className="btn btn-primary" onClick={handleClickNew}>
      {' '}
      Cambiar foto
    </button>
  );
};
