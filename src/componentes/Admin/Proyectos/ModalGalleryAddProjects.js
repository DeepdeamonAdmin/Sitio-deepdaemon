
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import { FormAddProject } from './FormAddProject';
import { Projects } from '../../../componentes/users/Projects';
import GalleryListModalProjects from './GalleryListModalProjects';
import { useState } from 'react';

export const ModalGalleryAddProjects = ({MgAFAP}) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    

    const [datos, setDatos] = useState('');

    const GlAMg = (datosGl) => {
        setDatos(datosGl);
    }
    const closeModal = () => {
        // TODO: cerrar el modal
        MgAFAP(datos)
        dispatch(uiCloseModal());
    }
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
            <div className='section'>
                <div className="card-columns ">
                    <GalleryListModalProjects GlAMg={GlAMg} />
                </div>
            </div>
            <button
                className="btn2 btn-primary btn-large btn-block"
                onClick={closeModal}
            >
                Cerrar
            </button>

        </Modal>
    )
}