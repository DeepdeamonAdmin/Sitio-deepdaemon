//Uso de React
import React from 'react';
import { useState } from 'react';

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Modal
import Modal from 'react-modal';

//Uso de Swal para las alertas de las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import GalleryListModal from './GalleryListModal';

export const ModalGalleryAdd = ({ MgAFAP }) => {
  //Indicar al estado la paertura del modal
  const { modalOpen } = useSelector((state) => state.ui);

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Varibales para almacenar la infomación de la imagen seleccionada
  const [datos, setDatos] = useState('');
  const GlAMg = (datosGl) => {
    setDatos(datosGl);
    Swal.fire('Imagen seleccionada');
  };

  //Función de cierre del modal
  const closeModal = () => {
    MgAFAP(datos);

    //Enviar al estado el cierre del modal
    dispatch(uiCloseModal());
  };

  //Funci´n para controlar el cambio del tipo de imagen
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (event) => {
    const { target } = event;
    setSelectValue(target.value);
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
      <h1>Elegir imagen</h1>
      <div className="col-md-6 mb-3">
        <label> Type </label>
        <select
          value={selectValue}
          className="form-control"
          name="type"
          onChange={handleSelectChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Aviso">Aviso</option>
          <option value="Alumno">Alumno</option>
          <option value="Externo">Externo</option>
          <option value="Lider">Líder</option>
          <option value="Proyecto">Proyecto</option>
          <option value="Publicacion">Publicación</option>
          <option value="Tesis">Tesis</option>
        </select>
      </div>
      <div className="row d-flex ml-3" style={{ gap: '10px' }}>
        <GalleryListModal GlAMg={GlAMg} status={selectValue} />
      </div>
      <button
        className="btn2 btn-primary btn-large btn-block"
        onClick={closeModal}
      >
        Cerrar
      </button>
    </Modal>
  );
};
