//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso de Firestore
import { auth } from '../../firebase/firebase-config';

//Uso de CSS
import './Ui.css';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import { ProjectDetaills } from '../Usuario/ProjectDetaills';

export const VerMasProject = (project) => {

    //Declaración del dispatch
    const dispatch = useDispatch();
    const proy = project;

    //Función para el manejo del clic
    const handleClickNew = () => {

        //Envio al estado la apertura del modal
        dispatch(uiOpenModal());
    }

    //Obtención del usuario
    const user = auth.currentUser;
    
    //Condición de despliegue de información si el usuario está autenticado
    if (!user) return <div style={{marginTop:-15 ,marginBottom: -15}}>
    <button
        className="btn btn-success"
        onClick={handleClickNew}
    >
        Ver más..
    </button>
    </div>
    return <ProjectDetaills project = {proy.project}/>
}
