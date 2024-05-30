//Uso de React
import React from 'react';

//Uso de Modal
import Modal from 'react-modal';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Componentes necesarios para la configuracion del modal
import { uiCloseModalEdit } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';

//Configuración del modal para insertarse
Modal.setAppElement('#app');

export const ModalEditarAlumno = (nombre) => {
  //Obtener el estatus del modal en el estado global
  const { modalEditOpen } = useSelector((state) => state.ui);

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Modal del formulario para editar a un alumno
  return (
    <Modal
      isOpen={modalEditOpen}
      onRequestClose={() => dispatch(uiCloseModalEdit())}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    ></Modal>
  );
};
