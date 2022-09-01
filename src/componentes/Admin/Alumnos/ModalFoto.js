import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';

import { AddNewFab } from '../../ui/AddNewFab';
import GalleryListModal from './GalleryListModal';

// //configuracion Modal
Modal.setAppElement('#app');

export const ModalFoto = (id) => {

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
			<h1>Elegir imagen</h1>
			<div className='section'>
				<div className="card-columns ">
					<GalleryListModal id={id}/>
				</div>
			</div>
        </Modal>
	)
}
