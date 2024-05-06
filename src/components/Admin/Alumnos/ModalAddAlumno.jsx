//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Modal
import Modal from 'react-modal';

//Componentes necesarios para la configuracion del modal
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import { FormAddAlumno } from './FormAddAlumno';

//Configuración del modal para insertarse
Modal.setAppElement('#app');

export const ModalAddAlumno = () => {

	//Obtener el estatus del modal en el estado global
	const { modalOpen } = useSelector(state => state.ui);

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Cerrar modal
	const closeModal = () => {
		
		//Indicar en el estado el cierre del modal
		dispatch(uiCloseModal());
	}

	//Modal del formulario para añadir a un alumno
	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<FormAddAlumno />
		</Modal>
	)
}

