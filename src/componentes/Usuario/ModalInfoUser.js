import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { uiCloseModal } from "../../actions/ui";
import { customStyles } from "../../helpers/modalCustomStyles";

export const ModalInfoUser = ({ usuario }) => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { datos }  = useSelector( state => state.user );
  let nombre;
    if(datos){
        nombre = datos.nombre
    }
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(uiCloseModal());
  };

  return (
    <Modal
      id={usuario.id}
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <div className="card-body">
        <h5 className="card-title">{usuario.nombre} </h5>
        <h5 className="card-title">{nombre} </h5>
        <button onClick={closeModal} className="btn btn-light">
          <span className="fas fa-times-circle"></span>
        </button>
      </div>
    </Modal>
  );
};
