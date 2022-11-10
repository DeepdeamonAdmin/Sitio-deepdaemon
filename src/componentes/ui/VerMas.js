import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal} from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';


import './Ui.css';

export const VerMas = (idUser) => {

    const dispatch = useDispatch();
    const user = auth.currentUser;

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    const { datos }  = useSelector( state => state.user );
    


    return (
        !user && <button
            className="btn btn-success"
            onClick={handleClickNew}
        >
            Ver más..
        </button>
        
    )
}
