import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal} from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';
import { LeaderDetaills } from '../Usuario/LeaderDetaills';
import { PublicationDetaills } from '../Usuario/PublicationDetaills';
import { TeamDetaills } from '../Usuario/TeamDetaills';


import './Ui.css';

export const VerMas = (usuario, publicacion) => {

    const dispatch = useDispatch();
    const user = auth.currentUser;
    const usuarioC = usuario;
    //console.log(usuarioC.usuario);

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    const { datos }  = useSelector( state => state.user );
    

    console.log(usuario.PublicationDetaills);
    
    return (
        
        !user ? <button
            className="btn btn-success"
            onClick={handleClickNew}
        >
            Ver más..
        </button>: (usuarioC.usuario.grado ==="leader" 
            ?
            <>
            <LeaderDetaills leader = {usuarioC.usuario} /> 
            
            </>
            : <TeamDetaills usuario = {usuarioC} /> )
        
           
    )
}