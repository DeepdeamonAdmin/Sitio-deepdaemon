import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const ControlModal = () => {

    

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }


    return (
        <button
            className="btn btn-primary "
            onClick={ handleClickNew }
        >
            Ver más..
        </button>
    )
}
