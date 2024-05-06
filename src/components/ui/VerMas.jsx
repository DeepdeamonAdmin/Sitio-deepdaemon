//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso de Firestore
import { auth } from '../../firebase/firebase-config';

//Componentes necesarios
import { uiOpenModal} from '../../actions/ui';
import { LeaderDetaills } from '../Usuario/LeaderDetaills';
import { TeamDetaills } from '../Usuario/TeamDetaills';
import './Ui.css';

export const VerMas = (usuario) => {

    //Declaración del dispatch
    const dispatch = useDispatch();

    //Obtención del usuario
    const user = auth.currentUser;
    const usuarioC = usuario;

    //Función para el manejo del clic
    const handleClickNew = () => {

        //Envio al estado la apertura del modal
        dispatch( uiOpenModal() );
    }

    //Despliegue de los detalles al dar clic en el botón "Ver más"
    return (
        !user ? <button
            className="btn btn-success"
            onClick={handleClickNew}
        >
            Ver más..
        </button>: (usuarioC.usuario.grado ==="leader" 
            ?
            <>
            <LeaderDetaills leader = {usuarioC.usuario} className='popup-leader'/> 
            
            </>
            : <TeamDetaills usuario = {usuarioC} /> )
    )
}