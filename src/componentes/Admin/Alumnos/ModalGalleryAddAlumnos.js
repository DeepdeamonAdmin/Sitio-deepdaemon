
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import GalleryListModalAlumnos from './GalleryListModalAlumnos';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const ModalGalleryAddAlumnos = ({MgAFAP}) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    

    const [datos, setDatos] = useState('');

    const GlAMg = (datosGl) => {
        setDatos(datosGl);
        Swal.fire('Imagen seleccionada')
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
                    <GalleryListModalAlumnos GlAMg={GlAMg} />
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