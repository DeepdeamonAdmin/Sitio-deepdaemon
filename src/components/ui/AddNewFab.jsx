//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import './Ui.css';

export const AddNewFab = () => {

    //Declaración del dispatch
    const dispatch = useDispatch();

    //Función para manejar el clic sobre el botón de "+"
    const handleClickNew = () => {

        //Enviar al estado la apertura de un modal
        dispatch( uiOpenModal() );
    }

    //Despliegue del botón "+"
    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
