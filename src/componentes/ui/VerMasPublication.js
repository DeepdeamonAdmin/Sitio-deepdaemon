import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';

import './Ui.css';
import { PublicationDetaills } from '../Usuario/PublicationDetaills';

export const VerMasPublication = (publicacion) => {

    const dispatch = useDispatch();
    const pub = publicacion;

    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }

    const user = auth.currentUser;
    

    if (!user) return <div>
        <button
            className="btn btn-success"
            onClick={handleClickNew}
            style={{marginTop:40}}
        >
            Ver más..
        </button>
    </div>

    return <PublicationDetaills publication = {pub.publicacion}/>







}
