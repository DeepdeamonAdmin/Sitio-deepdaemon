import React from 'react';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import fotoPerfil from '../../assets/Usuario.jpg';


import './Ui.css';

export const FotosGalleryChoose = () => {


    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }


    return (
        <button
            className="btn btn-primary"
            onClick={ handleClickNew }
        >
           Elegir foto
        </button>
    )
}