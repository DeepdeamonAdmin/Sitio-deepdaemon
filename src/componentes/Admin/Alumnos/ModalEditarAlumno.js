import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalEdit } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import { FormEditAlumno } from './FormEditAlumno';

Modal.setAppElement('#app');

export const ModalEditarAlumno = (nombre) => {
	const { modalEditOpen } = useSelector(state => state.ui);
	const dispatch = useDispatch();

	return (
		<Modal
			isOpen={modalEditOpen}
			onRequestClose={() => dispatch(uiCloseModalEdit())}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<FormEditAlumno nombre={nombre} />
		</Modal >
	)
}