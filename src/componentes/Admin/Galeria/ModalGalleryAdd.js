
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../../actions/ui';
import { customStyles } from '../../../helpers/modalCustomStyles';
import GalleryListModal from './GalleryListModal';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const ModalGalleryAdd = ({MgAFAP}) => {

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
    const [selectValue, setSelectValue] = useState('')
	const handleSelectChange = (event) => {
		const { target } = event;
		setSelectValue(target.value);
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
            <div className='col-md-6 mb-3'>
				<label> Type </label>
                <select
                    value={selectValue}
                    className="form-control"
                    name='type'
                    onChange={handleSelectChange}
                >
                    <option value=''>Selecciona una opción</option>
                    <option value='Aviso'>Aviso</option>
                    <option value='Alumno'>Alumno</option>
                    <option value='Externo'>Externo</option>
                    <option value='Lider'>Líder</option>
                    <option value='Proyecto'>Proyecto</option>
                    <option value='Publicacion'>Publicación</option>
                    <option value='Tesis'>Tesis</option>
                </select>
			</div>
            <div className="row d-flex ml-3" style={{gap:"10px"}}>
                <GalleryListModal GlAMg={GlAMg} status={selectValue}/>
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