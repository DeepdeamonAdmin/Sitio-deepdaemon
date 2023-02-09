import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal} from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';


import './Ui.css';

export const VerMasProject = (publicacion) => {

    const dispatch = useDispatch();
    //const project = auth.currentUser};

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }
    console.log("Publicccc")
    console.log(publicacion);



    return (
        <>
            <button
                className="btn btn-success"
                onClick={handleClickNew}
            >
                Ver más..
            </button>
        </>
        
        
           
    )
}
