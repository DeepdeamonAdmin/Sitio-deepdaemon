import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { uiCloseModalInfo } from "../../actions/ui";
import { customStyles } from "../../helpers/modalCustomStyles";

export const ModalInfoUser = ({usuario }) => {
  const { modalOpen } = useSelector((state) => state.ui);
 
  console.log(usuario);
  const dispatch = useDispatch();

  const closeModalInfo = () => {
    dispatch(uiCloseModalInfo());
  };

  return (
    <Modal
      id={usuario.id}
      isOpen={modalOpen}
      onRequestClose={closeModalInfo}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
				<div className='container'>
          <h1>{usuario.nombre}</h1>
				</div>
			
    </Modal>
  );
};
