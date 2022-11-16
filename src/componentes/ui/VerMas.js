import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal} from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';
import { TeamDetaills } from '../Usuario/TeamDetaills';


import './Ui.css';

export const VerMas = (eq) => {

    const dispatch = useDispatch();
    const user = auth.currentUser;

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    const { datos }  = useSelector( state => state.user );
    


    return (
        !user ? <button
            className="btn btn-success"
            onClick={handleClickNew}
        >
            Ver más..
        </button>: <TeamDetaills usuario = {eq} />       
    )
}
