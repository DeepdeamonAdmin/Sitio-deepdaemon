//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import './../ui/Ui.css';

export const AddNewFab = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Función para el manejo del clic
  const handleClickNew = () => {
    //Enviar al estado la apertura del modal
    dispatch(uiOpenModal());
  };

  //Despliegue del botno de adición
  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
