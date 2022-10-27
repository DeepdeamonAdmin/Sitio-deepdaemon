import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import './Ui.css';

export const VerMas = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    const { datos }  = useSelector( state => state.user );
    


    return (
        <button
            className="btn btn-success"
            onClick={datos ? console.log("Usuario Activo"):  handleClickNew }
        >
            Ver más..
        </button>
    )
}
