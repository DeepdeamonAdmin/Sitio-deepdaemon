import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';


import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import { FormAddLider } from './FormAddLider';

// //configuracion Modal
Modal.setAppElement('#app');

export const ModalAddLider = () => {

	const { modalOpen } = useSelector( state => state.ui );
    const dispatch = useDispatch();

	const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
    }

	return (
		<Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
			<FormAddLider/>
		</Modal>



		
	)
}

