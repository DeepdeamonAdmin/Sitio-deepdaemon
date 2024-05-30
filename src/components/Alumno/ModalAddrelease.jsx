//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Modal
import Modal from 'react-modal';

//Componentes necesarios
import { uiCloseModal } from '../../actions/ui';
import { customStyles } from '../../helpers/modalCustomStyles';
import { FormAddRelease } from './FormAddRelease';

export const ModalAddrelease = () => {
  //Obtener el estado del modal
  const { modalOpen } = useSelector((state) => state.ui);

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Función de cierre del modal
  const closeModal = () => {
    //Envio al estado el cierre del modal
    dispatch(uiCloseModal());
  };

  //Despliegue del modal
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <FormAddRelease />
    </Modal>
  );
};
