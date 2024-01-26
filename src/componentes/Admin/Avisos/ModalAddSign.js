//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Modal
import Modal from 'react-modal';

//Componentes necesarios
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import {FormAddSign} from './FormAddSign';

//Configuración del modal para insertarse
Modal.setAppElement('#app');

const ModalAddSign = () => {

	//Indicar al estado la apertura de un modal
	const { modalOpen } = useSelector(state => state.ui);

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Cierre del modal
	const closeModal = () => {

		//Indicar al estado el cierre del modal
		dispatch(uiCloseModal());
	}

	//Despliegue del modal para agregar un nuevo aviso
	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<FormAddSign />
		</Modal>
	);
}

export default ModalAddSign;
