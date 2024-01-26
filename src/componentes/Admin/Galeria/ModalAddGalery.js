//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Modal
import Modal from 'react-modal';

//Componentes necesarios
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import { FormAddGalery } from './FormAddGalery';

//Configuración del modal para insertarse
Modal.setAppElement('#app');

export const ModalAddGalery = () => {

	//Indicar al estado la apertura del modal
	const { modalOpen } = useSelector(state => state.ui);

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Función para el 
	const closeModal = () => {

		//Indicar al estado el cierre del modal
		dispatch(uiCloseModal());
	}

	//Despliegue del modal
	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			overlayClassName="modal-fondo"
		>
			<FormAddGalery />
		</Modal>
	)
}
