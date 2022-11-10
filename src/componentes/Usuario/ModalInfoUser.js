import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { uiCloseModal } from "../../actions/ui";
import { customStyles } from "../../helpers/modalCustomStyles";

export const ModalInfoUser = ({usuario }) => {
  const { modalOpen } = useSelector((state) => state.ui);
 
  console.log(usuario);
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
				<div className='d-flex flex-col animate__animated animate__fadeIn'>
					<ul class="list-group list-group-flush">
						<li className="list-group-item text-white bg-primary ">Descripción: {usuario.descripcion}</li>
						<li className={"list-group-item text-white bg-primary "}>Titulo: {usuario.titulo}</li>
						<li className="list-group-item">Grado: {usuario.grado}</li>
						<li className="list-group-item">Email: {usuario.email}</li>
						<li className="list-group-item">
							<a href={usuario.linkedin} class="card-link">LinkedIn</a>
							<a href={usuario.Github} class="card-link">GitHub</a>
						</li>
						<li className="list-group-item">
							<a href={usuario.facebook} class="card-link">Facebook</a>
						</li>
					</ul>
				</div>
			
    </Modal>
  );
};
