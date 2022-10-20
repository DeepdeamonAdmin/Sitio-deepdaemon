import React from 'react';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import './Ui.css';

export const VerMas = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }


    return (
        <button
            className="btn btn-success"
            onClick={ handleClickNew }
        >
            Ver más..
        </button>
    )
}
