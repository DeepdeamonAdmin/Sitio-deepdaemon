//Uso de React
import React from 'react';

//Uso de REdux
import { useDispatch } from 'react-redux';

//Uso de Firestore
import { auth } from '../../firebase/firebase-config';

//Uso de CSS
import './Ui.css';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import { PublicationDetaills } from '../Usuario/PublicationDetaills';

export const VerMasPublication = (publicacion) => {

    //Declaración del dispatch
    const dispatch = useDispatch();
    const pub = publicacion;

    //Función para el manejo del clic
    const handleClickNew = () => {

        //Envio al estado la apertura del modal
        dispatch(uiOpenModal());
    }

    //Obtención del usuario
    const user = auth.currentUser;
    
    //Condición de despliegue de información si el usuario está autenticado
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
